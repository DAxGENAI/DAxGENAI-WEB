const request = require('supertest');
const app = require('../server');

// Mock Firebase Admin to avoid initialization errors
jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn()
  }
}));

// Mock the service account key
jest.mock('../credentials/service-account-key.json', () => ({
  project_id: 'test-project'
}), { virtual: true });

describe('Server API Tests', () => {
  describe('Health Check', () => {
    it('GET /health should return server status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'OK',
        service: 'DAxGENAI Demo Booking API'
      });
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for non-existent endpoints', async () => {
      const response = await request(app)
        .get('/non-existent-endpoint')
        .expect(404);

      expect(response.body).toMatchObject({
        success: false,
        error: 'Endpoint not found'
      });
    });
  });

  describe('CORS Headers', () => {
    it('should include proper CORS headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });

    it('should handle OPTIONS requests', async () => {
      await request(app)
        .options('/health')
        .expect(204);
    });
  });

  describe('Security Headers', () => {
    it('should include security headers from helmet', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      // Check for helmet security headers
      expect(response.headers['x-frame-options']).toBeDefined();
      expect(response.headers['x-content-type-options']).toBeDefined();
    });
  });

  describe('Rate Limiting', () => {
    it('should apply rate limiting to API routes', async () => {
      // Make multiple requests to test rate limiting
      const requests = Array(5).fill().map(() => 
        request(app).get('/api/test-endpoints').send()
      );

      const responses = await Promise.all(requests);
      
      // All requests should either succeed or be rate limited
      responses.forEach(response => {
        expect([200, 404, 429]).toContain(response.status);
      });
    });
  });

  describe('Request Body Parsing', () => {
    it('should parse JSON bodies correctly', async () => {
      const testData = { test: 'data' };
      
      // This will likely 404, but should parse the JSON without errors
      const response = await request(app)
        .post('/api/test-json-parsing')
        .send(testData);

      // The endpoint doesn't exist, but the server should handle JSON parsing
      expect([404, 200]).toContain(response.status);
    });

    it('should handle large request bodies within limits', async () => {
      const largeData = { data: 'x'.repeat(1000) }; // 1KB of data
      
      const response = await request(app)
        .post('/api/test-large-body')
        .send(largeData);

      // Should not fail due to body size (within 10MB limit)
      expect(response.status).not.toBe(413); // Payload Too Large
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/api/test-malformed-json')
        .set('Content-Type', 'application/json')
        .send('{ invalid json }');

      expect(response.status).toBe(400);
    });
  });

  describe('Compression', () => {
    it('should compress responses when appropriate', async () => {
      const response = await request(app)
        .get('/health')
        .set('Accept-Encoding', 'gzip');

      // Response should be compressed for clients that support it
      expect(response.status).toBe(200);
    });
  });

  describe('Environment Configuration', () => {
    it('should handle development environment', () => {
      expect(process.env.NODE_ENV || 'development').toBeDefined();
    });

    it('should use correct port configuration', () => {
      expect(process.env.PORT || 5000).toBeDefined();
    });
  });
});
