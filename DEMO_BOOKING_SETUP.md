# 🎯 Demo Booking System Setup Guide

This guide will help you set up the complete demo booking system with Google Calendar integration and automated email notifications.

## 🚀 **What You Get:**

✅ **Automated Google Calendar Events** - Creates meetings automatically  
✅ **Google Meet Integration** - Generates meeting links  
✅ **Email Notifications** - Sends confirmations to both user and admin  
✅ **Real-time Availability** - Checks your calendar for available slots  
✅ **Professional Booking Flow** - Multi-step form with validation  
✅ **Admin Dashboard** - View and manage upcoming demos  

---

## 📋 **Prerequisites**

1. **Google Workspace Account** (for Calendar API)
2. **Gmail Account** (for sending emails)
3. **Firebase Project** (already set up)
4. **Node.js 18+** (already installed)

---

## 🔧 **Step 1: Google Calendar API Setup**

### 1.1 Enable Google Calendar API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google Calendar API**
4. Go to **APIs & Services > Library**
5. Search for "Google Calendar API" and enable it

### 1.2 Create Service Account
1. Go to **APIs & Services > Credentials**
2. Click **"Create Credentials" > "Service Account"**
3. Fill in the details:
   - **Name**: `daxgenai-demo-booking`
   - **Description**: `Service account for demo booking calendar integration`
4. Click **"Create and Continue"**
5. Skip role assignment (click **"Continue"**)
6. Click **"Done"**

### 1.3 Generate Service Account Key
1. Click on your service account
2. Go to **"Keys"** tab
3. Click **"Add Key" > "Create new key"**
4. Choose **JSON** format
5. Download the JSON file
6. **Save it securely** (e.g., `server/credentials/service-account-key.json`)

### 1.4 Share Calendar with Service Account
1. Open your Google Calendar
2. Find your service account email (in the JSON file)
3. Share your calendar with the service account email
4. Give it **"Make changes to events"** permission

---

## 📧 **Step 2: Gmail Setup**

### 2.1 Enable App Passwords
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Go to **Security**
3. Enable **2-Step Verification** if not already enabled
4. Go to **App passwords**
5. Generate a new app password for "Mail"
6. **Save this password** - you'll need it for the environment variables

---

## 🔐 **Step 3: Environment Variables**

### 3.1 Frontend (.env)
```env
# Demo Booking API
VITE_API_URL=http://localhost:5000

# Other existing variables...
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

### 3.2 Backend (.env in server folder)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Firebase Admin
FIREBASE_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=./credentials/service-account-key.json

# Gmail Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Email (where you'll receive demo notifications)
ADMIN_EMAIL=your-admin-email@gmail.com

# Google Calendar
GOOGLE_CALENDAR_ID=primary
```

---

## 🏗️ **Step 4: File Structure Setup**

### 4.1 Create Credentials Directory
```bash
cd server
mkdir credentials
# Place your service-account-key.json here
```

### 4.2 Verify File Structure
```
DAxGENAI/
├── server/
│   ├── credentials/
│   │   └── service-account-key.json  # Your Google service account key
│   ├── api/
│   │   ├── demo-booking.js           # Demo booking API
│   │   ├── send-demo-email.js        # Email service
│   │   └── test-endpoints.js         # Test endpoints
│   ├── server.js                     # Main server file
│   └── .env                          # Backend environment variables
├── src/
│   ├── services/
│   │   └── demoBookingService.ts     # Frontend demo booking service
│   └── components/
│       └── DemoBooking.tsx           # Demo booking component
└── .env                              # Frontend environment variables
```

---

## 🚀 **Step 5: Testing the Setup**

### 5.1 Start the Backend Server
```bash
cd server
npm install
npm run dev
```

### 5.2 Start the Frontend
```bash
# In another terminal
npm run dev
```

### 5.3 Test the Demo Booking
1. Go to your website
2. Click **"Book Free Demo"** button
3. Fill out the demo booking form
4. Submit the booking
5. Check your email for confirmation
6. Check your Google Calendar for the new event

---

## 📧 **Step 6: Email Templates**

The system automatically sends two types of emails:

### 6.1 Customer Confirmation Email
- ✅ Demo details (date, time, duration)
- ✅ Google Meet link
- ✅ Preparation instructions
- ✅ Booking ID for reference

### 6.2 Admin Notification Email
- ✅ Customer details (name, email, phone, company)
- ✅ Demo details (date, time, training interest)
- ✅ Google Meet link
- ✅ Booking ID

---

## 🎯 **Step 7: Customization**

### 7.1 Available Time Slots
Edit `server/api/demo-booking.js` to modify available time slots:
```javascript
const defaultSlots = [
  { time: '09:00', label: '9:00 AM' },
  { time: '10:00', label: '10:00 AM' },
  // Add or modify slots as needed
];
```

### 7.2 Demo Duration
Change the demo duration (currently 60 minutes):
```javascript
const eventEnd = new Date(eventDate.getTime() + 60 * 60 * 1000); // 60 minutes
```

### 7.3 Email Templates
Customize email content in `server/api/demo-booking.js`:
- `customerEmailContent` - Email sent to customers
- `adminEmailContent` - Email sent to admin

### 7.4 Calendar Event Details
Modify the Google Calendar event in `server/api/demo-booking.js`:
```javascript
const event = {
  summary: `DAxGENAI Demo - ${bookingData.name}`,
  description: `Your custom description here...`,
  // ... other event properties
};
```

---

## 🔍 **Step 8: Troubleshooting**

### 8.1 Common Issues

**❌ "Failed to create calendar event"**
- Check if Google Calendar API is enabled
- Verify service account key is correct
- Ensure calendar is shared with service account

**❌ "Failed to send confirmation emails"**
- Check Gmail app password is correct
- Verify EMAIL_USER and EMAIL_PASS in .env
- Ensure 2-Step Verification is enabled

**❌ "Service account not found"**
- Verify GOOGLE_APPLICATION_CREDENTIALS path
- Check if service account key file exists
- Ensure file permissions are correct

### 8.2 Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=true
```

### 8.3 Test Endpoints
Use the test endpoints to verify setup:
```bash
# Test email service
curl -X POST http://localhost:5000/api/test-email

# Test calendar integration
curl -X GET http://localhost:5000/api/demo/available-slots?date=2024-01-15
```

---

## 📊 **Step 9: Monitoring & Analytics**

### 9.1 View Upcoming Demos
Access the admin endpoint to see upcoming demos:
```bash
curl -X GET http://localhost:5000/api/demo/upcoming
```

### 9.2 Firebase Analytics
Demo bookings are automatically tracked in Firebase Analytics with:
- Event: `demo_booking_form`
- Parameters: User details, training interest, etc.

### 9.3 Google Calendar Integration
- All demos appear in your Google Calendar
- Google Meet links are automatically generated
- Reminders are set (24 hours and 15 minutes before)

---

## 🎉 **Step 10: Go Live!**

### 10.1 Production Deployment
1. **Update environment variables** for production
2. **Deploy backend** to your hosting provider
3. **Update frontend** API URL to production backend
4. **Test thoroughly** before going live

### 10.2 Production Environment Variables
```env
# Production Backend
NODE_ENV=production
VITE_API_URL=https://your-api-domain.com
EMAIL_USER=your-production-email@gmail.com
ADMIN_EMAIL=your-admin-email@gmail.com
```

### 10.3 Security Checklist
- ✅ Service account key is secure
- ✅ Environment variables are protected
- ✅ HTTPS is enabled
- ✅ Rate limiting is configured
- ✅ Input validation is working

---

## 🏆 **You're Ready!**

Your demo booking system is now fully functional with:

✅ **Automated Google Calendar integration**  
✅ **Professional email notifications**  
✅ **Real-time availability checking**  
✅ **Multi-step booking form**  
✅ **Admin dashboard access**  
✅ **Production-ready security**  

**Start booking demos and growing your business!** 🚀

---

## 📞 **Support**

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Test the API endpoints individually
4. Check Google Cloud Console for API quotas and errors
5. Review server logs for detailed error messages

**Your demo booking system is now ready to convert visitors into customers!** 🎯
