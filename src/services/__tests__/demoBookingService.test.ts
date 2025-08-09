import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { demoBookingService, DemoBookingData } from '../demoBookingService';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    search: '?utm_source=google&utm_medium=cpc&utm_campaign=test',
  },
  writable: true,
});

describe('DemoBookingService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockBookingData: DemoBookingData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    company: 'Test Company',
    role: 'Data Analyst',
    experience: 'Beginner',
    goals: 'Learn data analysis',
    preferredTime: '10:00',
    preferredDate: '2024-01-15',
    timezone: 'Asia/Kolkata',
    trainingInterest: 'Python for Data Science',
    status: 'pending',
  };

  describe('testBackendConnection', () => {
    it('returns true when backend is healthy', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: 'OK' }),
      });

      const result = await demoBookingService.testBackendConnection();
      
      expect(result).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:5001/health',
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    it('returns false when backend is unhealthy', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await demoBookingService.testBackendConnection();
      
      expect(result).toBe(false);
    });

    it('handles network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await demoBookingService.testBackendConnection();
      
      expect(result).toBe(false);
    });
  });

  describe('createDemoBooking', () => {
    it('successfully creates a booking', async () => {
      const mockBookingResponse = {
        ok: true,
        json: async () => ({ bookingId: 'booking_123' }),
        headers: new Map(),
      };

      const mockEmailResponse = {
        ok: true,
        json: async () => ({ success: true }),
      };

      mockFetch
        .mockResolvedValueOnce(mockBookingResponse)
        .mockResolvedValueOnce(mockEmailResponse);

      const result = await demoBookingService.createDemoBooking(mockBookingData);

      expect(result).toEqual({
        bookingId: 'booking_123',
        googleMeetLink: 'https://meet.google.com/demo-booking_123-20240115',
      });

      expect(mockFetch).toHaveBeenCalledTimes(2);
      
      // Check booking creation call
      expect(mockFetch).toHaveBeenNthCalledWith(1,
        'http://localhost:5001/api/demo/create-booking',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('"name":"John Doe"'),
        })
      );

      // Check email sending call
      expect(mockFetch).toHaveBeenNthCalledWith(2,
        'http://localhost:5001/api/send-demo-email',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    it('includes UTM parameters in booking request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ bookingId: 'booking_123' }),
        headers: new Map(),
      }).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await demoBookingService.createDemoBooking(mockBookingData);

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(requestBody).toMatchObject({
        utmSource: 'google',
        utmMedium: 'cpc',
        utmCampaign: 'test',
        source: 'website',
      });
    });

    it('handles booking creation failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Booking failed' }),
      });

      await expect(demoBookingService.createDemoBooking(mockBookingData))
        .rejects.toThrow('Failed to create demo booking');
    });

    it('continues if email sending fails', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ bookingId: 'booking_123' }),
          headers: new Map(),
        })
        .mockRejectedValueOnce(new Error('Email failed'));

      const result = await demoBookingService.createDemoBooking(mockBookingData);

      expect(result.bookingId).toBe('booking_123');
    });
  });

  describe('getAvailableTimeSlots', () => {
    it('returns default time slots', async () => {
      const slots = await demoBookingService.getAvailableTimeSlots('2024-01-15');

      expect(slots).toHaveLength(10);
      expect(slots[0]).toMatchObject({
        time: '09:00',
        available: true,
        label: '9:00 AM',
        timezone: 'Asia/Kolkata',
      });
    });

    it('handles errors and returns default slots', async () => {
      const slots = await demoBookingService.getAvailableTimeSlots('invalid-date');

      expect(slots).toHaveLength(10);
      expect(slots[0].available).toBe(true);
    });
  });

  describe('validateBookingData', () => {
    it('validates correct booking data', () => {
      const result = demoBookingService.validateBookingData(mockBookingData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('returns errors for missing required fields', () => {
      const invalidData = {
        ...mockBookingData,
        name: '',
        email: '',
        phone: '',
      };

      const result = demoBookingService.validateBookingData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name is required');
      expect(result.errors).toContain('Email is required');
      expect(result.errors).toContain('Phone is required');
    });

    it('validates email format', () => {
      const invalidData = {
        ...mockBookingData,
        email: 'invalid-email',
      };

      const result = demoBookingService.validateBookingData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please enter a valid email address');
    });

    it('accepts valid email formats', () => {
      const validEmails = [
        'user@example.com',
        'test.email+tag@domain.co.uk',
        'user123@test-domain.org',
      ];

      validEmails.forEach(email => {
        const data = { ...mockBookingData, email };
        const result = demoBookingService.validateBookingData(data);
        expect(result.isValid).toBe(true);
      });
    });
  });
});
