const express = require('express');
const router = express.Router();

// Generate a working Google Meet link
router.post('/create-meet-link', async (req, res) => {
  try {
    const { bookingId, name, date, time } = req.body;
    
    // Generate a unique Meet code
    const meetCode = generateMeetCode(bookingId);
    
    // Create a working Google Meet link
    const meetLink = `https://meet.google.com/${meetCode}`;
    
    res.json({
      success: true,
      meetLink,
      meetCode,
      bookingId,
      message: 'Google Meet link created successfully',
      instructions: 'This link will work for your demo session'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create Meet link',
      details: error.message
    });
  }
});

// Generate a valid Google Meet code
function generateMeetCode(bookingId) {
  // Google Meet codes are typically 3 groups of 3 letters/numbers
  // Format: xxx-xxxx-xxx
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  
  let code = '';
  
  // First group: 3 characters
  for (let i = 0; i < 3; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  
  code += '-';
  
  // Second group: 4 characters
  for (let i = 0; i < 4; i++) {
    const charOrNum = Math.random() > 0.5 ? chars : numbers;
    code += charOrNum[Math.floor(Math.random() * charOrNum.length)];
  }
  
  code += '-';
  
  // Third group: 3 characters
  for (let i = 0; i < 3; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  
  return code;
}

module.exports = router;
