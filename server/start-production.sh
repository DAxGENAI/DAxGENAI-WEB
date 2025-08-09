#!/bin/bash

echo "🚀 Starting DAxGENAI Demo Booking API in Production Mode"
echo "========================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Set production environment
export NODE_ENV=production
export PORT=5001

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "⚠️  .env.production not found. Creating from .env..."
    cp .env .env.production
fi

# Create logs directory
mkdir -p logs

echo "🔧 Environment: $NODE_ENV"
echo "🌐 Port: $PORT"
echo "📁 Logs: ./logs/"
echo ""

# Start the server
echo "🚀 Starting server..."
node server.js

echo ""
echo "✅ Server started successfully!"
echo "🌐 API available at: http://localhost:$PORT"
echo "🔍 Health check: http://localhost:$PORT/health"
echo ""
echo "📋 Useful commands:"
echo "  curl http://localhost:$PORT/health                    # Health check"
echo "  curl http://localhost:$PORT/api/test-config          # Test configuration"
echo "  curl -X POST http://localhost:$PORT/api/test-email   # Test email"
echo ""
echo "Press Ctrl+C to stop the server"
