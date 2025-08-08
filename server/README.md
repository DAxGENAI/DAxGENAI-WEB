# DAxGENAI Demo Booking Backend

This backend service handles demo booking confirmations, Google Meet integration, and automated email sending.

## Features

- ✅ Demo booking confirmation emails
- ✅ Google Meet link generation
- ✅ Calendar invitation (.ics file)
- ✅ Reminder emails (24 hours before)
- ✅ Follow-up emails (after demo)
- ✅ Rate limiting and security
- ✅ Firebase integration for data storage

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Variables

Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=DAxGENAI <your-email@gmail.com>

# Google Calendar API
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
GOOGLE_CALENDAR_ID=primary

# Firebase Admin (if using Firebase)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Security
JWT_SECRET=your-jwt-secret-key
SESSION_SECRET=your-session-secret

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

### 3. Gmail Setup

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this password in `EMAIL_PASS`

### 4. Google Calendar API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Calendar API
4. Create service account credentials:
   - APIs & Services → Credentials
   - Create Credentials → Service Account
   - Download JSON key file
5. Save as `google-credentials.json` in server directory
6. Share your Google Calendar with the service account email

### 5. Firebase Setup (Optional)

If using Firebase for data storage:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create/select your project
3. Go to Project Settings → Service Accounts
4. Generate new private key
5. Add Firebase config to environment variables

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### POST /api/send-demo-email
Sends demo confirmation email with Google Meet link.

**Request Body:**
```json
{
  "bookingData": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Tech Corp",
    "role": "Data Analyst",
    "experience": "Intermediate",
    "goals": "Career transition to data science",
    "preferredDate": "2024-01-15",
    "preferredTime": "14:00",
    "timezone": "Asia/Kolkata",
    "trainingInterest": "Python Programming for Data Science"
  },
  "bookingId": "demo-12345"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Demo confirmation email sent successfully",
  "googleMeetLink": "https://meet.google.com/demo-12345-20240115",
  "calendarEventId": "calendar-event-id"
}
```

### POST /api/send-reminder-email
Sends reminder email 24 hours before demo.

### POST /api/send-followup-email
Sends follow-up email after demo completion.

## Email Templates

The system includes professionally designed email templates:

1. **Confirmation Email**: Sent immediately after booking
   - Demo details and Google Meet link
   - Calendar invitation attachment
   - Preparation tips
   - Contact information

2. **Reminder Email**: Sent 24 hours before demo
   - Gentle reminder with meeting link
   - Preparation checklist

3. **Follow-up Email**: Sent after demo completion
   - Thank you message
   - Next steps
   - Course recommendations

## Security Features

- ✅ Helmet.js for security headers
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling
- ✅ Request logging

## Monitoring

The server includes comprehensive logging:

- Request/response logging with Morgan
- Error logging with stack traces
- Email delivery status logging
- Google Calendar API interaction logging

## Deployment

### Heroku
```bash
heroku create daxgenai-demo-api
heroku config:set NODE_ENV=production
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password
git push heroku main
```

### Vercel
```bash
vercel --prod
```

### Docker
```bash
docker build -t daxgenai-demo-api .
docker run -p 5000:5000 daxgenai-demo-api
```

## Troubleshooting

### Email Not Sending
1. Check Gmail app password is correct
2. Verify 2-factor authentication is enabled
3. Check email credentials in environment variables

### Google Meet Not Creating
1. Verify Google Calendar API is enabled
2. Check service account credentials
3. Ensure calendar is shared with service account

### Rate Limiting Issues
1. Check rate limit configuration
2. Verify IP address is not blocked
3. Monitor request frequency

## Support

For issues or questions:
- Email: training@daxgenai.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)
