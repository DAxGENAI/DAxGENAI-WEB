#!/bin/bash

echo "🎯 DAxGENAI Demo Booking Configuration"
echo "======================================"
echo ""

# Check if service account key exists
if [ ! -f "server/credentials/service-account-key.json" ]; then
    echo "❌ Service account key not found!"
    echo "Please download your service account key from Google Cloud Console and place it at:"
    echo "server/credentials/service-account-key.json"
    echo ""
    echo "Steps:"
    echo "1. Go to https://console.cloud.google.com/"
    echo "2. Navigate to APIs & Services > Credentials"
    echo "3. Click on your service account"
    echo "4. Go to Keys tab > Add Key > Create new key (JSON)"
    echo "5. Download and move to server/credentials/service-account-key.json"
    echo ""
    read -p "Press Enter when you have the service account key ready..."
fi

# Get configuration values
echo "📝 Please provide the following information:"
echo ""

# Firebase Project ID
read -p "Enter your Firebase Project ID (e.g., daxgenai-12345): " FIREBASE_PROJECT_ID

# Gmail Configuration
read -p "Enter your Gmail address: " EMAIL_USER
read -p "Enter your 16-character Gmail app password: " EMAIL_PASS
read -p "Enter admin email (where you'll receive demo notifications): " ADMIN_EMAIL

# Update backend .env file
echo ""
echo "🔧 Updating backend configuration..."
cat > server/.env << EOF
# Server Configuration
PORT=5000
NODE_ENV=development

# Firebase Admin
FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
GOOGLE_APPLICATION_CREDENTIALS=./credentials/service-account-key.json

# Gmail Configuration
EMAIL_USER=${EMAIL_USER}
EMAIL_PASS=${EMAIL_PASS}

# Admin Email (where you'll receive demo notifications)
ADMIN_EMAIL=${ADMIN_EMAIL}

# Google Calendar
GOOGLE_CALENDAR_ID=primary

# Optional: Debug mode
DEBUG=true
EOF

# Update frontend .env file
echo "🔧 Updating frontend configuration..."
cat > .env << EOF
# Demo Booking API
VITE_API_URL=http://localhost:5000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=${FIREBASE_PROJECT_ID}.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
VITE_FIREBASE_STORAGE_BUCKET=${FIREBASE_PROJECT_ID}.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

# AI API Keys
VITE_GEMINI_API_KEY=your-gemini-api-key
VITE_OPENAI_API_KEY=your-openai-api-key

# Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# App Configuration
VITE_APP_NAME=DAxGENAI
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development
EOF

echo "✅ Configuration files updated!"
echo ""

# Check if service account key exists now
if [ -f "server/credentials/service-account-key.json" ]; then
    echo "✅ Service account key found!"
else
    echo "❌ Service account key still missing!"
    echo "Please place your service account key at: server/credentials/service-account-key.json"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Share your Google Calendar with the service account email"
echo "2. Test the demo booking system"
echo "3. Start the servers"
echo ""
echo "To start the servers:"
echo "  Backend:  cd server && npm run dev"
echo "  Frontend: npm run dev"
echo ""
echo "🎉 Your demo booking system is ready to configure!"
