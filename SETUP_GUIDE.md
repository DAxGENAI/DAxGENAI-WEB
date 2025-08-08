# 🚀 DAxGENAI Demo Booking System - Complete Setup Guide

## 📋 **Prerequisites**
- Node.js 18+ installed
- Gmail account with 2FA enabled
- Google Cloud Console access
- Firebase project (optional)

---

## 🔧 **Step 1: Backend Server Setup**

### 1.1 Install Dependencies
```bash
cd server
npm install
```

### 1.2 Configure Environment Variables
Edit the `.env` file in the server directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email Configuration (Gmail) - REQUIRED
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=DAxGENAI <your-actual-email@gmail.com>

# Google Calendar API - REQUIRED
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
GOOGLE_CALENDAR_ID=primary

# Security - REQUIRED
JWT_SECRET=generate-a-random-secret-key-here
SESSION_SECRET=generate-another-random-secret-key-here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

### 1.3 Test Backend Server
```bash
npm run dev
```

You should see:
```
🚀 DAxGENAI Demo Booking API running on port 5000
📧 Email service: Configured
📅 Google Calendar: Configured
```

---

## 📧 **Step 2: Gmail Setup (Required)**

### 2.1 Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification
3. Enable 2FA if not already enabled

### 2.2 Generate App Password
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification → App passwords
3. Select "Mail" from dropdown
4. Click "Generate"
5. Copy the 16-character password
6. Use this password in `EMAIL_PASS` in your `.env` file

### 2.3 Test Email Configuration
```bash
# Test email sending (optional)
curl -X POST http://localhost:5000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

---

## 📅 **Step 3: Google Calendar API Setup (Required)**

### 3.1 Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Note your Project ID

### 3.2 Enable Google Calendar API
1. Go to APIs & Services → Library
2. Search for "Google Calendar API"
3. Click "Enable"

### 3.3 Create Service Account
1. Go to APIs & Services → Credentials
2. Click "Create Credentials" → "Service Account"
3. Fill in details:
   - Name: `daxgenai-demo-booking`
   - Description: `Service account for demo booking system`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

### 3.4 Generate Service Account Key
1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Select "JSON" format
5. Click "Create"
6. Download the JSON file
7. Save as `google-credentials.json` in the server directory

### 3.5 Share Calendar with Service Account
1. Go to [Google Calendar](https://calendar.google.com/)
2. Click the gear icon → Settings
3. Go to "Share with specific people"
4. Add the service account email (from the JSON file)
5. Give "Make changes to events" permission
6. Click "Send"

### 3.6 Test Google Calendar Integration
```bash
# Test calendar creation (optional)
curl -X POST http://localhost:5000/api/test-calendar \
  -H "Content-Type: application/json" \
  -d '{"summary": "Test Event", "start": "2024-01-15T10:00:00Z"}'
```

---

## 🔥 **Step 4: Firebase Setup (Optional but Recommended)**

### 4.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Note your Project ID

### 4.2 Generate Service Account Key
1. Go to Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Add Firebase config to your `.env` file:

```env
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
```

### 4.3 Set Up Firestore Database
1. Go to Firestore Database
2. Click "Create Database"
3. Start in test mode
4. Choose a location close to your users

---

## 🌐 **Step 5: Frontend Integration**

### 5.1 Update API Endpoint
In `src/services/emailService.ts`, update the API endpoint:

```typescript
private apiEndpoint = 'http://localhost:5000/api/send-demo-email';
```

### 5.2 Test Frontend Integration
1. Start your frontend development server:
```bash
cd ..  # Go back to root directory
npm run dev
```

2. Navigate to the contact page
3. Click "Schedule Free Demo"
4. Fill out the form and submit
5. Check your email for confirmation

---

## 🧪 **Step 6: Testing the Complete System**

### 6.1 Start Both Servers
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd ..
npm run dev
```

### 6.2 Test Demo Booking Flow
1. Open http://localhost:3000
2. Go to Contact section
3. Click "Schedule Free Demo"
4. Fill out all 4 steps:
   - Step 1: Personal information
   - Step 2: Learning goals
   - Step 3: Schedule date/time
   - Step 4: Review and confirm
5. Submit the form
6. Check your email for confirmation

### 6.3 Verify Email Delivery
- ✅ Confirmation email received
- ✅ Google Meet link included
- ✅ Calendar invitation attached
- ✅ Professional formatting

---

## 🔍 **Step 7: Troubleshooting**

### Common Issues and Solutions

#### Email Not Sending
```bash
# Check Gmail settings
1. Verify 2FA is enabled
2. Confirm app password is correct
3. Check EMAIL_USER and EMAIL_PASS in .env
4. Test with: curl -X POST http://localhost:5000/api/test-email
```

#### Google Calendar Not Working
```bash
# Check Google Calendar API
1. Verify API is enabled in Google Cloud Console
2. Check service account permissions
3. Confirm google-credentials.json is in server directory
4. Test with: curl -X POST http://localhost:5000/api/test-calendar
```

#### Frontend Not Connecting
```bash
# Check API endpoint
1. Verify backend is running on port 5000
2. Check CORS settings in server.js
3. Confirm FRONTEND_URL in .env
4. Check browser console for errors
```

#### Firebase Connection Issues
```bash
# Check Firebase config
1. Verify FIREBASE_PROJECT_ID is correct
2. Check FIREBASE_PRIVATE_KEY format (include quotes)
3. Confirm FIREBASE_CLIENT_EMAIL is correct
4. Test Firebase connection
```

---

## 📊 **Step 8: Monitoring and Maintenance**

### 8.1 Check Server Logs
```bash
# Monitor server logs
tail -f server/logs/app.log

# Check for errors
grep "ERROR" server/logs/app.log
```

### 8.2 Monitor Email Delivery
```bash
# Check email logs
grep "email" server/logs/app.log

# Monitor delivery status
curl http://localhost:5000/health
```

### 8.3 Performance Monitoring
```bash
# Check API response times
curl -w "@curl-format.txt" http://localhost:5000/api/health

# Monitor rate limiting
curl -X POST http://localhost:5000/api/send-demo-email
```

---

## 🚀 **Step 9: Production Deployment**

### 9.1 Environment Variables for Production
```env
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-production-app-password
```

### 9.2 Deploy Backend
```bash
# Heroku
heroku create daxgenai-demo-api
heroku config:set NODE_ENV=production
git push heroku main

# Vercel
vercel --prod

# DigitalOcean
# Upload files and run: npm start
```

### 9.3 Update Frontend API Endpoint
```typescript
// Update in emailService.ts
private apiEndpoint = 'https://your-backend-domain.com/api/send-demo-email';
```

---

## ✅ **Setup Checklist**

- [ ] Backend dependencies installed
- [ ] Environment variables configured
- [ ] Gmail 2FA enabled and app password generated
- [ ] Google Calendar API enabled
- [ ] Service account created and key downloaded
- [ ] Calendar shared with service account
- [ ] Firebase project created (optional)
- [ ] Frontend API endpoint updated
- [ ] Both servers running
- [ ] Demo booking flow tested
- [ ] Email confirmation received
- [ ] Google Meet link working
- [ ] Calendar invitation received

---

## 🆘 **Need Help?**

### Support Resources
- **Email**: training@daxgenai.com
- **Documentation**: Check `DEMO_BOOKING_ENHANCEMENT.md`
- **Server Logs**: Check `server/logs/` directory
- **Health Check**: `http://localhost:5000/health`

### Common Commands
```bash
# Start backend
cd server && npm run dev

# Start frontend
npm run dev

# Check server health
curl http://localhost:5000/health

# View logs
tail -f server/logs/app.log

# Test email
curl -X POST http://localhost:5000/api/test-email
```

---

**🎉 Congratulations! Your demo booking system is now ready to use!**

Once setup is complete, users can:
1. Click "Schedule Free Demo" on your website
2. Fill out the professional multi-step form
3. Receive automatic Google Meet invitations
4. Get beautiful confirmation emails with calendar invites
5. Join demos seamlessly with one-click access
