const express = require('express');
const router = express.Router();

// Debug endpoint to test frontend connection
router.get('/debug-connection', (req, res) => {
  console.log('🔍 Debug connection request received');
  console.log('📋 Request headers:', req.headers);
  console.log('🌐 Request origin:', req.get('origin'));
  console.log('📱 User agent:', req.get('user-agent'));
  
  res.json({
    success: true,
    message: 'Backend connection successful',
    timestamp: new Date().toISOString(),
    serverInfo: {
      port: process.env.PORT || 5001,
      environment: process.env.NODE_ENV || 'development',
      corsEnabled: true,
      allowedOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://192.168.0.126:3000']
    },
    requestInfo: {
      origin: req.get('origin'),
      userAgent: req.get('user-agent'),
      method: req.method,
      url: req.url
    }
  });
});

// Test CORS preflight
router.options('/debug-connection', (req, res) => {
  console.log('🔄 CORS preflight request received');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

// Simple health check for frontend
router.get('/frontend-health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend is accessible from frontend',
    timestamp: new Date().toISOString(),
    apiUrl: `http://localhost:${process.env.PORT || 5001}`
  });
});

module.exports = router;
