const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Test email configuration
router.post('/test-email', async (req, res) => {
  try {
    const { email = 'test@example.com' } = req.body;
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Test email
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'DAxGENAI Demo Booking - Test Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🎉 Email Test Successful!</h2>
          <p>Your DAxGENAI demo booking email system is working correctly.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Configuration Details:</h3>
            <ul>
              <li><strong>Email Service:</strong> Gmail</li>
              <li><strong>From Address:</strong> ${process.env.EMAIL_USER}</li>
              <li><strong>Test Time:</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>
          <p>You can now proceed with the full demo booking setup!</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: 'Test email sent successfully',
      to: email,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send test email',
      details: error.message 
    });
  }
});

// Test server configuration
router.get('/test-config', (req, res) => {
  const config = {
    server: {
      port: process.env.PORT || 5000,
      nodeEnv: process.env.NODE_ENV || 'development',
      frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
    },
    email: {
      user: process.env.EMAIL_USER ? 'Configured' : 'Not configured',
      pass: process.env.EMAIL_PASS ? 'Configured' : 'Not configured',
      from: process.env.EMAIL_FROM || 'Not configured'
    },
    google: {
      credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'Configured' : 'Not configured',
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary'
    },
    security: {
      jwtSecret: process.env.JWT_SECRET ? 'Configured' : 'Not configured',
      sessionSecret: process.env.SESSION_SECRET ? 'Configured' : 'Not configured',
      rateLimit: process.env.RATE_LIMIT_MAX_REQUESTS ? 'Configured' : 'Not configured'
    },
    timestamp: new Date().toISOString()
  };

  res.json(config);
});

// Test Google Calendar API (if configured)
router.post('/test-calendar', async (req, res) => {
  try {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      return res.status(400).json({
        success: false,
        error: 'Google Calendar API not configured',
        message: 'Please set up GOOGLE_APPLICATION_CREDENTIALS in your .env file'
      });
    }

    const { google } = require('googleapis');
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    const calendar = google.calendar({ version: 'v3', auth });
    
    // Test calendar access
    const response = await calendar.calendarList.list();
    
    res.json({
      success: true,
      message: 'Google Calendar API test successful',
      calendars: response.data.items?.length || 0,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Google Calendar test error:', error);
    res.status(500).json({
      success: false,
      error: 'Google Calendar API test failed',
      details: error.message
    });
  }
});

// Health check with detailed status
router.get('/health-detailed', (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      email: {
        status: process.env.EMAIL_USER && process.env.EMAIL_PASS ? 'Configured' : 'Not configured',
        user: process.env.EMAIL_USER ? 'Set' : 'Not set'
      },
      googleCalendar: {
        status: process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'Configured' : 'Not configured',
        credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'File exists' : 'File missing'
      },
      firebase: {
        status: process.env.FIREBASE_PROJECT_ID ? 'Configured' : 'Not configured',
        projectId: process.env.FIREBASE_PROJECT_ID || 'Not set'
      }
    },
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
    }
  };

  res.json(health);
});

module.exports = router;
