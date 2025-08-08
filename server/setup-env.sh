#!/bin/bash

echo "🚀 DAxGENAI Demo Booking System Setup"
echo "======================================"
echo ""

# Create .env file
echo "Creating .env file..."
cat > .env << 'EOF'
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
JWT_SECRET=your-jwt-secret-key-here
SESSION_SECRET=your-session-secret-here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
EOF

echo "✅ .env file created!"
echo ""
echo "📝 Next steps:"
echo "1. Edit .env file with your actual credentials"
echo "2. Set up Gmail app password"
echo "3. Configure Google Calendar API"
echo "4. Test the server"
echo ""
echo "Run: nano .env (or your preferred editor)"
