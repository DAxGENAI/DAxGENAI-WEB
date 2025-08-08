#!/bin/bash

echo "🚀 DAxGENAI Demo Booking System - Quick Setup"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << 'EOF'
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email Configuration (Gmail) - UPDATE THESE
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=DAxGENAI <your-email@gmail.com>

# Google Calendar API - UPDATE THESE
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
GOOGLE_CALENDAR_ID=primary

# Security - UPDATE THESE
JWT_SECRET=your-jwt-secret-key-here
SESSION_SECRET=your-session-secret-here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

cd ..

# Install frontend dependencies if needed
echo "📦 Checking frontend dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    echo "✅ Frontend dependencies installed"
else
    echo "✅ Frontend dependencies already installed"
fi

echo ""
echo "🎉 Initial setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Edit server/.env with your actual credentials"
echo "2. Set up Gmail app password (see SETUP_GUIDE.md)"
echo "3. Configure Google Calendar API (see SETUP_GUIDE.md)"
echo "4. Test the system:"
echo "   - Backend: cd server && npm run dev"
echo "   - Frontend: npm run dev"
echo ""
echo "📖 For detailed instructions, see SETUP_GUIDE.md"
echo "🆘 For help, email: training@daxgenai.com"
