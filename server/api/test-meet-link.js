const express = require('express');
const router = express.Router();

// Test Google Meet link generation
router.get('/test-meet-link', (req, res) => {
  try {
    const bookingId = `test_${Date.now()}`;
    const date = '2025-08-20';
    
    // Generate a Meet link
    const meetLink = `https://meet.google.com/demo-${bookingId}-${date.replace(/-/g, '')}`;
    
    res.json({
      success: true,
      bookingId,
      meetLink,
      message: 'Google Meet link generated successfully',
      instructions: 'This link can be used for demo sessions'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate Meet link',
      details: error.message
    });
  }
});

// Test email with Meet link
router.post('/test-email-with-meet', async (req, res) => {
  try {
    const { email = 'test@example.com' } = req.body;
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const bookingId = `test_${Date.now()}`;
    const meetLink = `https://meet.google.com/demo-${bookingId}-20250820`;
    
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">🎉 Your DAxGENAI Demo is Confirmed!</h2>
        
        <p>Hi Test User,</p>
        
        <p>Thank you for booking a demo with DAxGENAI! Your session has been confirmed.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">📅 Demo Details</h3>
          <p><strong>Date:</strong> 8/20/2025</p>
          <p><strong>Time:</strong> 18:00</p>
          <p><strong>Duration:</strong> 60 minutes</p>
          <p><strong>Training Interest:</strong> Introduction to Data Analysis</p>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
        </div>

        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">🔗 Join Your Demo</h3>
          <p>Click the link below to join your Google Meet session:</p>
          <a href="${meetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0;">
            Join Google Meet
          </a>
          <p style="margin-top: 10px; font-size: 14px; color: #666;">
            Or copy this link: <a href="${meetLink}">${meetLink}</a>
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
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎉 Your DAxGENAI Demo is Confirmed!',
      html: emailContent,
    });

    res.json({
      success: true,
      message: 'Test email with Meet link sent successfully',
      meetLink,
      bookingId,
      sentTo: email
    });

  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send test email with Meet link',
      details: error.message
    });
  }
});

module.exports = router;
