#!/bin/bash

echo "🚀 DAxGENAI Demo Booking Setup"
echo "================================"

# Create backend .env file
echo "📝 Creating backend environment file..."
cat > server/.env << EOF
# Server Configuration
PORT=5000
NODE_ENV=development

# Firebase Admin
FIREBASE_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=./credentials/service-account-key.json

# Gmail Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password

# Admin Email (where you'll receive demo notifications)
ADMIN_EMAIL=your-admin-email@gmail.com

# Google Calendar
GOOGLE_CALENDAR_ID=primary

# Optional: Debug mode
DEBUG=true
EOF

echo "✅ Backend .env file created at server/.env"
echo ""
echo "🔧 Next Steps:"
echo "1. Edit server/.env with your actual values:"
echo "   - FIREBASE_PROJECT_ID: Your Firebase project ID"
echo "   - EMAIL_USER: Your Gmail address"
echo "   - EMAIL_PASS: Your 16-character app password"
echo "   - ADMIN_EMAIL: Where you want to receive demo notifications"
echo ""
echo "2. Place your service account key at:"
echo "   server/credentials/service-account-key.json"
echo ""
echo "3. Start the server:"
echo "   cd server && npm run dev"
echo ""
echo "🎯 Your demo booking system will be ready!"
