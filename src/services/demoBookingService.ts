// import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import { db } from '../firebase/config';

export interface DemoBookingData {
  name: string;
  email: string;
  phone: string;
  company: string; // Optional field for user's role/status (e.g., "Data Analyst", "Student", "Business Owner")
  role: string;
  experience: string;
  goals: string;
  preferredTime: string;
  preferredDate: string;
  timezone: string;
  trainingInterest: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  googleMeetLink?: string;
  calendarEventId?: string;
  bookingId?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  label: string;
  timezone: string;
}

class DemoBookingService {
  private apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // Test method to check backend connectivity
  async testBackendConnection(): Promise<boolean> {
    try {
      console.log('🧪 Testing backend connection...');
      console.log('🌐 API URL:', this.apiUrl);
      
      const response = await fetch(`${this.apiUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📥 Test response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend test successful:', data);
        return true;
      } else {
        console.error('❌ Backend test failed:', response.status);
        return false;
      }
    } catch (error) {
      console.error('💥 Backend connection test failed:', error);
      return false;
    }
  }

  // Create demo booking
  async createDemoBooking(data: DemoBookingData): Promise<{ bookingId: string; googleMeetLink?: string }> {
    try {
      console.log('🚀 Starting demo booking creation...');
      console.log('📡 API URL:', this.apiUrl);
      console.log('📋 Form data:', data);
      
      const requestBody = {
        ...data,
        source: 'website',
        utmSource: new URLSearchParams(window.location.search).get('utm_source'),
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium'),
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      };
      
      console.log('📤 Request body:', requestBody);
      console.log('🌐 Making request to:', `${this.apiUrl}/api/demo/create-booking`);

      // Create booking in backend
      const bookingResponse = await fetch(`${this.apiUrl}/api/demo/create-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('📥 Response status:', bookingResponse.status);
      console.log('📥 Response headers:', Object.fromEntries(bookingResponse.headers.entries()));

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        console.error('❌ Response not OK:', errorData);
        throw new Error(errorData.error || 'Failed to create booking');
      }

      const bookingResult = await bookingResponse.json();
      console.log('✅ Booking result:', bookingResult);
      
      const { bookingId } = bookingResult;

      // Send confirmation email
      try {
        console.log('📧 Sending confirmation email...');
        await fetch(`${this.apiUrl}/api/send-demo-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookingData: data,
            bookingId,
          }),
        });
        console.log('✅ Email sent successfully');
      } catch (emailError) {
        console.warn('⚠️ Email sending failed, but booking was created:', emailError);
      }

      const result = {
        bookingId,
        googleMeetLink: `https://meet.google.com/demo-${bookingId}-${data.preferredDate.replace(/-/g, '')}`
      };
      
      console.log('🎉 Final result:', result);
      return result;
    } catch (error) {
      console.error('💥 Error creating demo booking:', error);
      console.error('💥 Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw new Error('Failed to create demo booking');
    }
  }

  // Create Google Calendar event - Simplified version
  private async createGoogleCalendarEvent(data: DemoBookingData, bookingId: string): Promise<{ eventId: string; googleMeetLink: string }> {
    // Simplified - just return a generated meet link
    return {
      eventId: `demo_${bookingId}`,
      googleMeetLink: `https://meet.google.com/demo-${bookingId}-${data.preferredDate.replace(/-/g, '')}`
    };
  }

  // Update booking - Simplified version
  private async updateBooking(bookingId: string, updates: Partial<DemoBookingData>): Promise<void> {
    // Simplified - just log the update
    console.log('Booking update:', { bookingId, updates });
  }

  // Send confirmation emails - Simplified version
  private async sendConfirmationEmails(data: DemoBookingData, bookingId: string, googleMeetLink?: string): Promise<void> {
    try {
      await fetch(`${this.apiUrl}/api/send-demo-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingData: data,
          bookingId,
        }),
      });
    } catch (error) {
      console.warn('Email sending failed:', error);
    }
  }

  // Get available time slots
  async getAvailableTimeSlots(date: string, timezone: string = 'Asia/Kolkata'): Promise<TimeSlot[]> {
    try {
      // For now, return default time slots
      // In a real implementation, you would check calendar availability
      return this.getDefaultTimeSlots();
    } catch (error) {
      console.error('Error getting time slots:', error);
      return this.getDefaultTimeSlots();
    }
  }

  private getDefaultTimeSlots(): TimeSlot[] {
    return [
      { time: '09:00', available: true, label: '9:00 AM', timezone: 'Asia/Kolkata' },
      { time: '10:00', available: true, label: '10:00 AM', timezone: 'Asia/Kolkata' },
      { time: '11:00', available: true, label: '11:00 AM', timezone: 'Asia/Kolkata' },
      { time: '14:00', available: true, label: '2:00 PM', timezone: 'Asia/Kolkata' },
      { time: '15:00', available: true, label: '3:00 PM', timezone: 'Asia/Kolkata' },
      { time: '16:00', available: true, label: '4:00 PM', timezone: 'Asia/Kolkata' },
      { time: '17:00', available: true, label: '5:00 PM', timezone: 'Asia/Kolkata' },
      { time: '18:00', available: true, label: '6:00 PM', timezone: 'Asia/Kolkata' },
      { time: '19:00', available: true, label: '7:00 PM', timezone: 'Asia/Kolkata' },
      { time: '20:00', available: true, label: '8:00 PM', timezone: 'Asia/Kolkata' },
    ];
  }

  // Validate booking data
  validateBookingData(data: DemoBookingData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name?.trim()) errors.push('Name is required');
    if (!data.email?.trim()) errors.push('Email is required');
    if (!data.phone?.trim()) errors.push('Phone is required');
    if (!data.preferredDate?.trim()) errors.push('Preferred date is required');
    if (!data.preferredTime?.trim()) errors.push('Preferred time is required');
    if (!data.trainingInterest?.trim()) errors.push('Training interest is required');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      errors.push('Please enter a valid email address');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const demoBookingService = new DemoBookingService();
