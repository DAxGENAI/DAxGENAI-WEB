# Environment Setup Guide for DAxGENAI

This guide will help you set up all the necessary environment variables and API keys for the DAxGENAI platform.

## Required Environment Variables

Create a `.env` file in the root directory with the following variables:

### Firebase Configuration
```env
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

### AI API Keys
```env
VITE_GEMINI_API_KEY=your-gemini-api-key
VITE_OPENAI_API_KEY=your-openai-api-key
```

### Stripe Configuration
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
VITE_STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
```

### Google Analytics
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### API Configuration
```env
VITE_API_URL=http://localhost:5000
```

### App Configuration
```env
VITE_APP_NAME=DAxGENAI
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development
```

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google Sign-in
4. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in test mode
5. Get your config:
   - Go to Project Settings
   - Scroll down to "Your apps"
   - Click the web app icon
   - Copy the config object

### 2. AI API Keys

#### Google Gemini
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to `VITE_GEMINI_API_KEY`

#### OpenAI
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key to `VITE_OPENAI_API_KEY`

### 3. Stripe Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or sign in
3. Get your API keys:
   - Go to Developers > API keys
   - Copy the publishable key to `VITE_STRIPE_PUBLISHABLE_KEY`
   - Copy the secret key to `VITE_STRIPE_SECRET_KEY` (for backend)
4. Create products and prices:
   - Go to Products
   - Create courses as products
   - Set up pricing plans

### 4. Google Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property
3. Get your Measurement ID (G-XXXXXXXXXX)
4. Add it to `VITE_GA_MEASUREMENT_ID`

## Backend Environment Variables

For the server directory, create a `.env` file with:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Firebase Admin
FIREBASE_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json

# Stripe
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google Calendar
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
GOOGLE_CALENDAR_ID=your-calendar-id

# Database
MONGODB_URI=your-mongodb-uri

# JWT Secret
JWT_SECRET=your-jwt-secret
```

## Firebase Service Account Setup

1. Go to Firebase Console > Project Settings
2. Go to Service Accounts tab
3. Click "Generate new private key"
4. Download the JSON file
5. Place it in a secure location
6. Update `GOOGLE_APPLICATION_CREDENTIALS` path

## Security Rules for Firestore

Add these security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read published courses
    match /courses/{courseId} {
      allow read: if resource.data.isPublished == true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Users can read/write their own progress
    match /userProgress/{progressId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Anyone can read course reviews
    match /courseReviews/{reviewId} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## Testing the Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Test authentication:
   - Try to register a new user
   - Try to sign in with Google
   - Test password reset

4. Test course functionality:
   - Browse courses
   - Enroll in a course
   - Track progress

5. Test payments:
   - Try to purchase a course
   - Test subscription flow

## Troubleshooting

### Common Issues

1. **Firebase not initialized**: Check your Firebase config values
2. **Authentication errors**: Ensure Authentication is enabled in Firebase
3. **Stripe errors**: Verify your Stripe keys are correct
4. **CORS errors**: Check your API URL configuration

### Debug Mode

Enable debug mode by setting:
```env
VITE_APP_ENVIRONMENT=development
VITE_DEBUG=true
```

This will show more detailed error messages in the console.

## Production Deployment

For production, update these variables:

```env
VITE_APP_ENVIRONMENT=production
VITE_API_URL=https://your-api-domain.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-live-stripe-key
```

Remember to:
- Use production Firebase project
- Use live Stripe keys
- Set up proper CORS headers
- Configure domain restrictions
- Set up SSL certificates

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure all services are properly configured
4. Check the Firebase console for authentication logs
