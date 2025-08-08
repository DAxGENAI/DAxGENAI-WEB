#!/bin/bash

echo "🔍 DAxGENAI Demo Booking System - Setup Verification"
echo "===================================================="
echo ""

# Check if backend server is running
echo "📡 Checking backend server..."
if curl -s http://localhost:5000/health > /dev/null; then
    echo "✅ Backend server is running on port 5000"
else
    echo "❌ Backend server is not running"
    echo "   Start it with: cd server && npm run dev"
    echo ""
    exit 1
fi

# Check server configuration
echo "⚙️  Checking server configuration..."
CONFIG=$(curl -s http://localhost:5000/api/test-config)
if [ $? -eq 0 ]; then
    echo "✅ Server configuration endpoint working"
    echo "   Configuration details:"
    echo "$CONFIG" | jq '.' 2>/dev/null || echo "$CONFIG"
else
    echo "❌ Server configuration endpoint failed"
fi

# Check detailed health
echo "🏥 Checking detailed health status..."
HEALTH=$(curl -s http://localhost:5000/api/health-detailed)
if [ $? -eq 0 ]; then
    echo "✅ Health check endpoint working"
    echo "   Health status:"
    echo "$HEALTH" | jq '.' 2>/dev/null || echo "$HEALTH"
else
    echo "❌ Health check endpoint failed"
fi

echo ""
echo "🧪 Testing email configuration..."
echo "   (This will send a test email if configured)"
read -p "Enter your email to test (or press Enter to skip): " TEST_EMAIL

if [ ! -z "$TEST_EMAIL" ]; then
    echo "📧 Sending test email to $TEST_EMAIL..."
    EMAIL_TEST=$(curl -s -X POST http://localhost:5000/api/test-email \
        -H "Content-Type: application/json" \
        -d "{\"email\": \"$TEST_EMAIL\"}")
    
    if echo "$EMAIL_TEST" | grep -q "success.*true"; then
        echo "✅ Test email sent successfully!"
        echo "   Check your inbox for the test email"
    else
        echo "❌ Test email failed"
        echo "   Error: $EMAIL_TEST"
        echo "   Make sure EMAIL_USER and EMAIL_PASS are configured in server/.env"
    fi
else
    echo "⏭️  Skipping email test"
fi

echo ""
echo "🌐 Testing frontend..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend server is running on port 3000"
    echo "   Open http://localhost:3000 to test the demo booking form"
else
    echo "❌ Frontend server is not running"
    echo "   Start it with: npm run dev"
fi

echo ""
echo "📋 Setup Verification Summary:"
echo "=============================="
echo ""

# Check environment variables
echo "Environment Variables:"
if [ -f "server/.env" ]; then
    echo "✅ .env file exists"
    
    if grep -q "EMAIL_USER=your-email@gmail.com" server/.env; then
        echo "⚠️  EMAIL_USER needs to be updated"
    else
        echo "✅ EMAIL_USER configured"
    fi
    
    if grep -q "EMAIL_PASS=your-app-password" server/.env; then
        echo "⚠️  EMAIL_PASS needs to be updated"
    else
        echo "✅ EMAIL_PASS configured"
    fi
    
    if grep -q "JWT_SECRET=your-jwt-secret-key-here" server/.env; then
        echo "⚠️  JWT_SECRET needs to be updated"
    else
        echo "✅ JWT_SECRET configured"
    fi
else
    echo "❌ .env file missing"
fi

echo ""
echo "Google Calendar API:"
if [ -f "server/google-credentials.json" ]; then
    echo "✅ Google credentials file exists"
else
    echo "❌ Google credentials file missing"
    echo "   Download from Google Cloud Console and save as server/google-credentials.json"
fi

echo ""
echo "📖 Next Steps:"
echo "=============="
echo "1. Update server/.env with your actual credentials"
echo "2. Set up Gmail app password (see SETUP_GUIDE.md)"
echo "3. Configure Google Calendar API (see SETUP_GUIDE.md)"
echo "4. Test the complete demo booking flow:"
echo "   - Go to http://localhost:3000"
echo "   - Click 'Schedule Free Demo'"
echo "   - Fill out the form and submit"
echo "   - Check your email for confirmation"
echo ""
echo "📚 Documentation:"
echo "================="
echo "- SETUP_GUIDE.md - Complete setup instructions"
echo "- DEMO_BOOKING_ENHANCEMENT.md - System overview"
echo "- server/README.md - Backend documentation"
echo ""
echo "🆘 Need help? Email: training@daxgenai.com"
