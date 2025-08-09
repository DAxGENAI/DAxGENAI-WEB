#!/bin/bash

echo "🚀 DAxGENAI Production Deployment Script"
echo "========================================"
echo ""

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2 globally..."
    npm install -g pm2
else
    echo "✅ PM2 is already installed"
fi

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p logs

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set production environment
echo "🔧 Setting production environment..."
export NODE_ENV=production

# Stop any existing PM2 processes
echo "🛑 Stopping existing PM2 processes..."
pm2 stop daxgenai-api 2>/dev/null || true
pm2 delete daxgenai-api 2>/dev/null || true

# Start with PM2
echo "🚀 Starting DAxGENAI API with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Setup PM2 startup script
echo "🔧 Setting up PM2 startup script..."
pm2 startup

echo ""
echo "✅ Production deployment complete!"
echo ""
echo "📊 PM2 Status:"
pm2 status
echo ""
echo "📋 Useful commands:"
echo "  pm2 logs daxgenai-api          # View logs"
echo "  pm2 restart daxgenai-api       # Restart service"
echo "  pm2 stop daxgenai-api          # Stop service"
echo "  pm2 delete daxgenai-api        # Remove service"
echo ""
echo "🌐 API should be running on: http://localhost:5001"
echo "🔍 Health check: curl http://localhost:5001/health"
