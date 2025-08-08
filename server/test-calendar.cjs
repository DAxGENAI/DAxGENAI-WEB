const { google } = require('googleapis');
require('dotenv').config({ path: './.env' });

async function testCalendarIntegration() {
  try {
    console.log('🔍 Testing Google Calendar Integration...');
    
    // Check environment variables
    console.log('📋 Environment Check:');
    console.log('- GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
    console.log('- EMAIL_USER:', process.env.EMAIL_USER);
    console.log('- ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
    
    // Initialize auth
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
    
    console.log('🔐 Getting auth client...');
    const authClient = await auth.getClient();
    console.log('✅ Auth client obtained');
    
    // Initialize calendar
    const calendar = google.calendar({ version: 'v3', auth: authClient });
    
    console.log('📅 Testing calendar access...');
    
    // Test calendar list
    const calendarList = await calendar.calendarList.list();
    console.log('✅ Calendar list retrieved');
    console.log('📋 Available calendars:', calendarList.data.items.map(cal => cal.summary));
    
    // Test creating a simple event
    const testEvent = {
      summary: 'Test Event - DAxGENAI',
      description: 'This is a test event for DAxGENAI demo booking system',
      start: {
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), // Tomorrow + 1 hour
        timeZone: 'Asia/Kolkata',
      },
    };
    
    console.log('📝 Creating test event...');
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: testEvent,
    });
    
    console.log('✅ Test event created successfully!');
    console.log('📅 Event ID:', response.data.id);
    console.log('🔗 Event URL:', response.data.htmlLink);
    
    // Clean up - delete the test event
    console.log('🧹 Cleaning up test event...');
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: response.data.id,
    });
    console.log('✅ Test event deleted');
    
    console.log('🎉 All tests passed! Google Calendar integration is working.');
    
  } catch (error) {
    console.error('❌ Error testing calendar integration:');
    console.error('Error message:', error.message);
    console.error('Error details:', error);
    
    if (error.code) {
      console.error('Error code:', error.code);
    }
    
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testCalendarIntegration();
