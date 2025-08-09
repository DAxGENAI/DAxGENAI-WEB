// This would be your backend API endpoint (Node.js/Express example)
// You'll need to set up a proper backend server to handle this

const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const router = express.Router();

// Google Calendar API setup
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Google Calendar API authentication
async function getGoogleCalendarAuth() {
  const auth = new google.auth.GoogleAuth({
    keyFile: GOOGLE_APPLICATION_CREDENTIALS,
    scopes: SCOPES,
  });
  return auth.getClient();
}

// Create Google Meet event
async function createGoogleMeetEvent(bookingData, bookingId) {
  try {
    const auth = await getGoogleCalendarAuth();
    const calendar = google.calendar({ version: 'v3', auth });

    const startDate = new Date(`${bookingData.preferredDate}T${bookingData.preferredTime}:00`);
    const endDate = new Date(startDate.getTime() + 30 * 60000); // 30 minutes

    const event = {
      summary: `DAxGENAI Demo - ${bookingData.name}`,
      description: `Free 30-minute personalized demo session for ${bookingData.trainingInterest}`,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: bookingData.timezone || 'Asia/Kolkata',
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: bookingData.timezone || 'Asia/Kolkata',
      },
      attendees: [
        { email: bookingData.email },
        { email: 'trainer@daxgenai.com' }
      ],
      conferenceData: {
        createRequest: {
          requestId: bookingId,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 24 hours before
          { method: 'popup', minutes: 10 }, // 10 minutes before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    return response.data;
  } catch (error) {
    console.error('Error creating Google Meet event:', error);
    throw error;
  }
}

// Send confirmation email
async function sendConfirmationEmail(bookingData, bookingId, googleMeetLink) {
  const emailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Demo Confirmation - DAxGENAI</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #4f46e5); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Demo Confirmed!</h1>
          <p>Your free 30-minute personalized session is scheduled</p>
        </div>
        
        <div class="content">
          <h2>Hello ${bookingData.name},</h2>
          
          <p>Great news! Your demo session with DAxGENAI has been successfully scheduled. We're excited to help you on your data analytics journey!</p>
          
          <div class="details">
            <h3>📅 Demo Details</h3>
            <p><strong>Date:</strong> ${new Date(bookingData.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> ${bookingData.preferredTime} (${bookingData.timezone})</p>
            <p><strong>Duration:</strong> 30 minutes</p>
            <p><strong>Course Interest:</strong> ${bookingData.trainingInterest}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
          </div>
          
          <a href="${googleMeetLink}" class="button">Join Google Meet</a>
          
          <h3>🎯 What to Expect</h3>
          <ul>
            <li>Personalized career assessment</li>
            <li>Custom learning roadmap creation</li>
            <li>Q&A about our training programs</li>
            <li>Next steps and recommendations</li>
          </ul>
          
          <h3>📋 Preparation Tips</h3>
          <ul>
            <li>Test your microphone and camera</li>
            <li>Have your questions ready</li>
            <li>Think about your career goals</li>
            <li>Be ready to discuss your current skills</li>
          </ul>
          
          <div class="details">
            <h3>📞 Need to Reschedule?</h3>
            <p>If you need to reschedule, please contact us at least 24 hours before your scheduled time:</p>
            <p>📧 training@daxgenai.com<br>
            📱 +1 (555) 123-4567</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Best regards,<br>The DAxGENAI Team</p>
          <p>Transform your career with personalized data analytics training</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: bookingData.email,
    subject: `Demo Confirmed - DAxGENAI (${bookingId})`,
    html: emailTemplate,
    attachments: [
      {
        filename: 'demo-calendar-invite.ics',
        content: generateCalendarInvite(bookingData, bookingId, googleMeetLink)
      }
    ]
  };

  return transporter.sendMail(mailOptions);
}

// Generate calendar invite (.ics file)
function generateCalendarInvite(bookingData, bookingId, googleMeetLink) {
  const startDate = new Date(`${bookingData.preferredDate}T${bookingData.preferredTime}:00`);
  const endDate = new Date(startDate.getTime() + 30 * 60000);
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DAxGENAI//Demo Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${bookingId}@daxgenai.com`,
    `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `SUMMARY:DAxGENAI Demo - ${bookingData.name}`,
    `DESCRIPTION:Free 30-minute personalized demo session for ${bookingData.trainingInterest}`,
    `LOCATION:${googleMeetLink}`,
    'ORGANIZER;CN=DAxGENAI Trainer:mailto:trainer@daxgenai.com',
    `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${bookingData.email}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: DAxGENAI Demo tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

// API endpoint
router.post('/send-demo-email', async (req, res) => {
  try {
    const { bookingData, bookingId } = req.body;

    // Validate required fields
    if (!bookingData || !bookingId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Create a simple Google Meet link (without calendar integration for now)
    const googleMeetLink = `https://meet.google.com/demo-${bookingId}-${bookingData.preferredDate.replace(/-/g, '')}`;

    // Send confirmation email
    await sendConfirmationEmail(bookingData, bookingId, googleMeetLink);

    // Log the email activity
    console.log(`Demo confirmation email sent to ${bookingData.email} for booking ${bookingId}`);

    res.json({ 
      success: true, 
      message: 'Demo confirmation email sent successfully',
      googleMeetLink,
      bookingId
    });

  } catch (error) {
    console.error('Error in send-demo-email endpoint:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send demo confirmation email',
      details: error.message 
    });
  }
});

// Reminder email endpoint
router.post('/send-reminder-email', async (req, res) => {
  try {
    const { bookingId, email, demoDate, demoTime, googleMeetLink } = req.body;

    const reminderTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Demo Reminder - DAxGENAI</title>
      </head>
      <body>
        <h2>Demo Reminder</h2>
        <p>Your demo is scheduled for tomorrow at ${demoTime}.</p>
        <p><a href="${googleMeetLink}">Join Google Meet</a></p>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Reminder: Your DAxGENAI Demo Tomorrow (${bookingId})`,
      html: reminderTemplate
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Reminder email sent successfully' });

  } catch (error) {
    console.error('Error sending reminder email:', error);
    res.status(500).json({ success: false, error: 'Failed to send reminder email' });
  }
});

// Test email endpoint
router.post('/test-email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to || 'syedrhda@gmail.com',
      subject: subject || 'Test Email from DAxGENAI',
      text: text || 'This is a test email from the DAxGENAI demo booking system.',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email from the DAxGENAI demo booking system.</p>
        <p>If you receive this, the email configuration is working correctly.</p>
        <p>Time: ${new Date().toISOString()}</p>
      `
    };

    console.log('Attempting to send test email...');
    console.log('From:', process.env.EMAIL_USER);
    console.log('To:', mailOptions.to);
    
    const result = await transporter.sendMail(mailOptions);
    
    console.log('Test email sent successfully:', result.messageId);
    
    res.json({ 
      success: true, 
      message: 'Test email sent successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send test email',
      details: error.message 
    });
  }
});

module.exports = router;
