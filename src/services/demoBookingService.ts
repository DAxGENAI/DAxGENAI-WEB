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

  // Create demo booking
  async createDemoBooking(data: DemoBookingData): Promise<{ bookingId: string; googleMeetLink?: string }> {
    try {
      // Generate a unique booking ID
      const bookingId = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create Google Calendar event
      const calendarResponse = await this.createGoogleCalendarEvent(data, bookingId);
      
      // Send confirmation emails
      await this.sendConfirmationEmails(data, bookingId, calendarResponse.googleMeetLink);

      return {
        bookingId,
        googleMeetLink: calendarResponse.googleMeetLink
      };
    } catch (error) {
      console.error('Error creating demo booking:', error);
      throw new Error('Failed to create demo booking');
    }
  }

  // Create Google Calendar event
  private async createGoogleCalendarEvent(data: DemoBookingData, bookingId: string): Promise<{ eventId: string; googleMeetLink: string }> {
    try {
      const response = await fetch(`${this.apiUrl}/api/demo/create-calendar-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingData: data,
          bookingId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create calendar event');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw new Error('Failed to create calendar event');
    }
  }

  // Send confirmation emails
  private async sendConfirmationEmails(data: DemoBookingData, bookingId: string, googleMeetLink?: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/api/demo/send-confirmation-emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingData: data,
          bookingId,
          googleMeetLink: googleMeetLink || `https://meet.google.com/demo-${bookingId}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send confirmation emails');
      }
    } catch (error) {
      console.error('Error sending confirmation emails:', error);
      throw new Error('Failed to send confirmation emails');
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
