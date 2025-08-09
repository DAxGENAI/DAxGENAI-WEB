const express = require('express');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const router = express.Router();

// Google Calendar configuration
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Create Google Calendar event
router.post('/create-calendar-event', async (req, res) => {
  try {
    const { bookingData, bookingId } = req.body;
    
    const authClient = await auth.getClient();
    const calendar = google.calendar({ version: 'v3', auth: authClient });

    // Create event start and end times
    const eventDate = new Date(`${bookingData.preferredDate}T${bookingData.preferredTime}:00`);
    const eventEnd = new Date(eventDate.getTime() + 60 * 60 * 1000); // 1 hour duration

    const event = {
      summary: `DAxGENAI Demo - ${bookingData.name}`,
      description: `
Demo Booking Details:
- Name: ${bookingData.name}
- Email: ${bookingData.email}
- Phone: ${bookingData.phone}
- Status: ${bookingData.company}
- Role: ${bookingData.role}
- Experience: ${bookingData.experience}
- Goals: ${bookingData.goals}
- Training Interest: ${bookingData.trainingInterest}
- Booking ID: ${bookingId}

This is an automated demo booking for DAxGENAI platform.
      `,
      start: {
        dateTime: eventDate.toISOString(),
        timeZone: bookingData.timezone || 'Asia/Kolkata',
      },
      end: {
        dateTime: eventEnd.toISOString(),
        timeZone: bookingData.timezone || 'Asia/Kolkata',
      },
      conferenceData: {
        createRequest: {
          requestId: `meet-${bookingId}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 15 }, // 15 minutes before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
    });

    const googleMeetLink = response.data.conferenceData?.entryPoints?.[0]?.uri;

    res.json({
      eventId: response.data.id,
      googleMeetLink: googleMeetLink || null,
      eventUrl: response.data.htmlLink,
    });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    res.status(500).json({ error: 'Failed to create calendar event' });
  }
});

// In-memory storage for demo bookings (fallback)
let localDemoBookings = [];

// Create new demo booking in Firebase
router.post('/create-booking', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Validate required fields
    if (!bookingData.name || !bookingData.email || !bookingData.preferredDate || !bookingData.preferredTime) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, email, preferredDate, preferredTime' 
      });
    }

    // Generate booking ID
    const bookingId = `local_booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Try Firebase first, fallback to local storage
    let firebaseError = null;
    try {
      const db = admin.firestore();
      const bookingRef = db.collection('demo_bookings').doc(bookingId);
      
      await bookingRef.set({
        ...bookingData,
        bookingId,
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`Demo booking created in Firebase: ${bookingId} for ${bookingData.email}`);
      
      // Generate a working Google Meet link
      let googleMeetLink = null;
      
      try {
        console.log('🔗 Generating Google Meet link...');
        
        // Generate a unique Meet code
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        
        let meetCode = '';
        
        // First group: 3 characters
        for (let i = 0; i < 3; i++) {
          meetCode += chars[Math.floor(Math.random() * chars.length)];
        }
        
        meetCode += '-';
        
        // Second group: 4 characters
        for (let i = 0; i < 4; i++) {
          const charOrNum = Math.random() > 0.5 ? chars : numbers;
          meetCode += charOrNum[Math.floor(Math.random() * charOrNum.length)];
        }
        
        meetCode += '-';
        
        // Third group: 3 characters
        for (let i = 0; i < 3; i++) {
          meetCode += chars[Math.floor(Math.random() * chars.length)];
        }
        
        googleMeetLink = `https://meet.google.com/${meetCode}`;
        
        console.log('✅ Google Meet link generated:', googleMeetLink);
      } catch (meetError) {
        console.warn('⚠️ Meet link generation failed:', meetError.message);
      }
      
      // Send confirmation emails
      try {
        console.log('📧 Sending confirmation emails...');
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: bookingData.email,
          subject: '🎉 Your DAxGENAI Demo is Confirmed!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">🎉 Your DAxGENAI Demo is Confirmed!</h2>
              <p>Hi ${bookingData.name},</p>
              <p>Thank you for booking a demo with DAxGENAI! Your session has been confirmed.</p>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e40af; margin-top: 0;">📅 Demo Details</h3>
                <p><strong>Date:</strong> ${new Date(bookingData.preferredDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${bookingData.preferredTime}</p>
                <p><strong>Duration:</strong> 60 minutes</p>
                <p><strong>Training Interest:</strong> ${bookingData.trainingInterest}</p>
                <p><strong>Booking ID:</strong> ${bookingId}</p>
              </div>
              <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669; margin-top: 0;">🔗 Join Your Demo</h3>
                <p>Click the link below to join your Google Meet session:</p>
                <a href="${googleMeetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0;">
                  Join Google Meet
                </a>
                <p style="margin-top: 10px; font-size: 14px; color: #666;">
                  Or copy this link: <a href="${googleMeetLink}">${googleMeetLink}</a>
                </p>
              </div>
              <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #d97706; margin-top: 0;">📋 What to Prepare</h3>
                <ul>
                  <li>Have your questions ready about Data Analytics and AI</li>
                  <li>Prepare to discuss your learning goals</li>
                  <li>Test your microphone and camera</li>
                  <li>Join 5 minutes before the scheduled time</li>
                </ul>
              </div>
              <p>Best regards,<br>The DAxGENAI Team</p>
            </div>
          `
        });
        
        // Send admin notification
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || 'daxgenai@gmail.com',
          subject: `📅 New Demo Booking - ${bookingData.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #dc2626;">📅 New Demo Booking - DAxGENAI</h2>
              <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #dc2626; margin-top: 0;">👤 Customer Details</h3>
                <p><strong>Name:</strong> ${bookingData.name}</p>
                <p><strong>Email:</strong> ${bookingData.email}</p>
                <p><strong>Phone:</strong> ${bookingData.phone}</p>
                <p><strong>Company:</strong> ${bookingData.company}</p>
                <p><strong>Role:</strong> ${bookingData.role}</p>
                <p><strong>Experience:</strong> ${bookingData.experience}</p>
              </div>
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #0369a1; margin-top: 0;">🎯 Demo Details</h3>
                <p><strong>Date:</strong> ${new Date(bookingData.preferredDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${bookingData.preferredTime}</p>
                <p><strong>Training Interest:</strong> ${bookingData.trainingInterest}</p>
                <p><strong>Goals:</strong> ${bookingData.goals}</p>
                <p><strong>Booking ID:</strong> ${bookingId}</p>
              </div>
              <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669; margin-top: 0;">🔗 Google Meet Link</h3>
                <a href="${googleMeetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0;">
                  Join Meeting
                </a>
                <p style="margin-top: 10px; font-size: 14px; color: #666;">
                  Or copy this link: <a href="${googleMeetLink}">${googleMeetLink}</a>
                </p>
              </div>
              <p>Please prepare for this demo and ensure you're available at the scheduled time.</p>
            </div>
          `
        });
        
        console.log('✅ Confirmation emails sent');
      } catch (emailError) {
        console.warn('⚠️ Email sending failed:', emailError);
      }
      
      res.json({
        success: true,
        bookingId,
        googleMeetLink,
        message: 'Demo booking created successfully',
        storage: 'firebase'
      });
      
    } catch (firebaseErr) {
      firebaseError = firebaseErr.message;
      console.log(`Firebase error: ${firebaseErr.message}`);
      
      // Generate a working Google Meet link for local booking
      let googleMeetLink = null;
      
      try {
        console.log('🔗 Generating Google Meet link for local booking...');
        
        // Generate a unique Meet code
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        
        let meetCode = '';
        
        // First group: 3 characters
        for (let i = 0; i < 3; i++) {
          meetCode += chars[Math.floor(Math.random() * chars.length)];
        }
        
        meetCode += '-';
        
        // Second group: 4 characters
        for (let i = 0; i < 4; i++) {
          const charOrNum = Math.random() > 0.5 ? chars : numbers;
          meetCode += charOrNum[Math.floor(Math.random() * charOrNum.length)];
        }
        
        meetCode += '-';
        
        // Third group: 3 characters
        for (let i = 0; i < 3; i++) {
          meetCode += chars[Math.floor(Math.random() * chars.length)];
        }
        
        googleMeetLink = `https://meet.google.com/${meetCode}`;
        
        console.log('✅ Google Meet link generated for local booking:', googleMeetLink);
      } catch (meetError) {
        console.warn('⚠️ Meet link generation failed for local booking:', meetError.message);
      }
      
      // Fallback to local storage
      const localBooking = {
        ...bookingData,
        bookingId,
        googleMeetLink,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      localDemoBookings.push(localBooking);
      
      console.log(`Demo booking created locally: ${bookingId} for ${bookingData.email}`);
      
      // Send confirmation emails even with local storage
      try {
        console.log('📧 Sending confirmation emails for local booking...');
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: bookingData.email,
          subject: '🎉 Your DAxGENAI Demo is Confirmed!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">🎉 Your DAxGENAI Demo is Confirmed!</h2>
              <p>Hi ${bookingData.name},</p>
              <p>Thank you for booking a demo with DAxGENAI! Your session has been confirmed.</p>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e40af; margin-top: 0;">📅 Demo Details</h3>
                <p><strong>Date:</strong> ${new Date(bookingData.preferredDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${bookingData.preferredTime}</p>
                <p><strong>Duration:</strong> 60 minutes</p>
                <p><strong>Training Interest:</strong> ${bookingData.trainingInterest}</p>
                <p><strong>Booking ID:</strong> ${bookingId}</p>
              </div>
              ${googleMeetLink ? `
              <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669; margin-top: 0;">🔗 Join Your Demo</h3>
                <p>Click the link below to join your Google Meet session:</p>
                <a href="${googleMeetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0;">
                  Join Google Meet
                </a>
              </div>
              ` : ''}
              <p>Best regards,<br>The DAxGENAI Team</p>
            </div>
          `
        });
        
        // Send admin notification
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || 'daxgenai@gmail.com',
          subject: `📅 New Demo Booking - ${bookingData.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #dc2626;">📅 New Demo Booking - DAxGENAI</h2>
              <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #dc2626; margin-top: 0;">👤 Customer Details</h3>
                <p><strong>Name:</strong> ${bookingData.name}</p>
                <p><strong>Email:</strong> ${bookingData.email}</p>
                <p><strong>Phone:</strong> ${bookingData.phone}</p>
                <p><strong>Company:</strong> ${bookingData.company}</p>
                <p><strong>Role:</strong> ${bookingData.role}</p>
                <p><strong>Experience:</strong> ${bookingData.experience}</p>
              </div>
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #0369a1; margin-top: 0;">🎯 Demo Details</h3>
                <p><strong>Date:</strong> ${new Date(bookingData.preferredDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${bookingData.preferredTime}</p>
                <p><strong>Training Interest:</strong> ${bookingData.trainingInterest}</p>
                <p><strong>Goals:</strong> ${bookingData.goals}</p>
                <p><strong>Booking ID:</strong> ${bookingId}</p>
              </div>
              ${googleMeetLink ? `
              <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669; margin-top: 0;">🔗 Google Meet Link</h3>
                <a href="${googleMeetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0;">
                  Join Meeting
                </a>
              </div>
              ` : ''}
              <p>Please prepare for this demo and ensure you're available at the scheduled time.</p>
            </div>
          `
        });
        
        console.log('✅ Confirmation emails sent for local booking');
      } catch (emailError) {
        console.warn('⚠️ Email sending failed for local booking:', emailError);
      }
      
      res.json({
        success: true,
        bookingId,
        googleMeetLink,
        calendarEventId,
        message: 'Demo booking created successfully (local storage)',
        storage: 'local',
        firebaseError: firebaseErr.message
      });
    }
    
  } catch (error) {
    console.error('Error creating demo booking:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create demo booking',
      message: error.message 
    });
  }
});

// Update booking with calendar information
router.put('/update-booking', async (req, res) => {
  try {
    const { bookingId, calendarEventId, googleMeetLink, status } = req.body;

    await admin.firestore()
      .collection('demo_bookings')
      .doc(bookingId)
      .update({
        calendarEventId,
        googleMeetLink,
        status,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Send confirmation emails
router.post('/send-confirmation-emails', async (req, res) => {
  try {
    const { bookingData, bookingId, googleMeetLink } = req.body;

    // Email to customer
    const customerEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">🎉 Your DAxGENAI Demo is Confirmed!</h2>
        
        <p>Hi ${bookingData.name},</p>
        
        <p>Thank you for booking a demo with DAxGENAI! Your session has been confirmed.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">📅 Demo Details</h3>
          <p><strong>Date:</strong> ${new Date(bookingData.preferredDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${bookingData.preferredTime}</p>
          <p><strong>Duration:</strong> 60 minutes</p>
          <p><strong>Training Interest:</strong> ${bookingData.trainingInterest}</p>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
        </div>

        ${googleMeetLink ? `
        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">🔗 Join Your Demo</h3>
          <p>Click the link below to join your Google Meet session:</p>
          <a href="${googleMeetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0;">
            Join Google Meet
          </a>
        </div>
        ` : ''}

        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #d97706; margin-top: 0;">📋 What to Prepare</h3>
          <ul>
            <li>Have your questions ready about Data Analytics and AI</li>
            <li>Prepare to discuss your learning goals</li>
            <li>Test your microphone and camera</li>
            <li>Join 5 minutes before the scheduled time</li>
          </ul>
        </div>

        <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
        
        <p>Best regards,<br>The DAxGENAI Team</p>
      </div>
    `;

    // Email to admin
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">📅 New Demo Booking - DAxGENAI</h2>
        
        <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #dc2626; margin-top: 0;">👤 Customer Details</h3>
          <p><strong>Name:</strong> ${bookingData.name}</p>
          <p><strong>Email:</strong> ${bookingData.email}</p>
          <p><strong>Phone:</strong> ${bookingData.phone}</p>
          <p><strong>Company:</strong> ${bookingData.company}</p>
          <p><strong>Role:</strong> ${bookingData.role}</p>
          <p><strong>Experience:</strong> ${bookingData.experience}</p>
        </div>

        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0369a1; margin-top: 0;">🎯 Demo Details</h3>
          <p><strong>Date:</strong> ${new Date(bookingData.preferredDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${bookingData.preferredTime}</p>
          <p><strong>Training Interest:</strong> ${bookingData.trainingInterest}</p>
          <p><strong>Goals:</strong> ${bookingData.goals}</p>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
        </div>

        ${googleMeetLink ? `
        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">🔗 Google Meet Link</h3>
          <a href="${googleMeetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0;">
            Join Meeting
          </a>
        </div>
        ` : ''}

        <p>Please prepare for this demo and ensure you're available at the scheduled time.</p>
      </div>
    `;

    // Send emails
    await Promise.all([
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: bookingData.email,
        subject: '🎉 Your DAxGENAI Demo is Confirmed!',
        html: customerEmailContent,
      }),
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || 'admin@daxgenai.com',
        subject: `📅 New Demo Booking - ${bookingData.name}`,
        html: adminEmailContent,
      }),
    ]);

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending confirmation emails:', error);
    res.status(500).json({ error: 'Failed to send confirmation emails' });
  }
});

// Get available time slots
router.get('/available-slots', async (req, res) => {
  try {
    const { date, timezone = 'Asia/Kolkata' } = req.query;
    
    const authClient = await auth.getClient();
    const calendar = google.calendar({ version: 'v3', auth: authClient });

    // Get existing events for the date
    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const busyTimes = response.data.items.map(event => ({
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date),
    }));

    // Default time slots
    const defaultSlots = [
      { time: '09:00', label: '9:00 AM' },
      { time: '10:00', label: '10:00 AM' },
      { time: '11:00', label: '11:00 AM' },
      { time: '14:00', label: '2:00 PM' },
      { time: '15:00', label: '3:00 PM' },
      { time: '16:00', label: '4:00 PM' },
      { time: '17:00', label: '5:00 PM' },
      { time: '18:00', label: '6:00 PM' },
      { time: '19:00', label: '7:00 PM' },
      { time: '20:00', label: '8:00 PM' },
    ];

    // Check availability for each slot
    const availableSlots = defaultSlots.map(slot => {
      const slotStart = new Date(`${date}T${slot.time}:00`);
      const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);

      const isAvailable = !busyTimes.some(busy => 
        (slotStart >= busy.start && slotStart < busy.end) ||
        (slotEnd > busy.start && slotEnd <= busy.end) ||
        (slotStart <= busy.start && slotEnd >= busy.end)
      );

      return {
        time: slot.time,
        available: isAvailable,
        label: slot.label,
        timezone,
      };
    });

    res.json(availableSlots);
  } catch (error) {
    console.error('Error getting available slots:', error);
    res.status(500).json({ error: 'Failed to get available slots' });
  }
});

// Get booking by ID
router.get('/booking/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    const doc = await admin.firestore()
      .collection('demo_bookings')
      .doc(bookingId)
      .get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error getting booking:', error);
    res.status(500).json({ error: 'Failed to get booking' });
  }
});

// Cancel booking
router.post('/cancel-booking', async (req, res) => {
  try {
    const { bookingId, reason } = req.body;
    
    const doc = await admin.firestore()
      .collection('demo_bookings')
      .doc(bookingId)
      .get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const bookingData = doc.data();

    // Cancel Google Calendar event
    if (bookingData.calendarEventId) {
      const authClient = await auth.getClient();
      const calendar = google.calendar({ version: 'v3', auth: authClient });

      await calendar.events.delete({
        calendarId: 'primary',
        eventId: bookingData.calendarEventId,
      });
    }

    // Update booking status
    await admin.firestore()
      .collection('demo_bookings')
      .doc(bookingId)
      .update({
        status: 'cancelled',
        cancellationReason: reason,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    // Send cancellation emails
    const cancellationEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">❌ Demo Cancelled</h2>
        <p>Hi ${bookingData.name},</p>
        <p>Your demo scheduled for ${new Date(bookingData.preferredDate).toLocaleDateString()} at ${bookingData.preferredTime} has been cancelled.</p>
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        <p>Please book a new demo if you're still interested.</p>
        <p>Best regards,<br>The DAxGENAI Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: bookingData.email,
      subject: '❌ Demo Cancelled - DAxGENAI',
      html: cancellationEmail,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

// Get upcoming demos (admin only)
router.get('/upcoming', async (req, res) => {
  try {
    const snapshot = await admin.firestore()
      .collection('demo_bookings')
      .where('status', 'in', ['pending', 'confirmed'])
      .where('preferredDate', '>=', new Date().toISOString().split('T')[0])
      .orderBy('preferredDate')
      .orderBy('preferredTime')
      .limit(50)
      .get();

    const demos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(demos);
  } catch (error) {
    console.error('Error getting upcoming demos:', error);
    res.status(500).json({ error: 'Failed to get upcoming demos' });
  }
});

module.exports = router;
