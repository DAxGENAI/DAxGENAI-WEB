# 🚀 DAxGENAI Production Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Configuration
- [x] Generated secure JWT_SECRET
- [x] Generated secure SESSION_SECRET
- [x] Created .env.production file
- [x] Configured rate limiting
- [x] Set up CORS for production domains

### 2. Security Credentials
- [x] Firebase Service Account: `daxgenai-backend@daxgeniai.iam.gserviceaccount.com`
- [x] Gmail App Password: `higa cuch sauj xpxr`
- [x] Google Calendar API: Configured
- [x] JWT Secret: `b864ffdc0933ea7438d4b11a0920cbd51c57258ceb743fcb0c9e443e2b1627eb`
- [x] Session Secret: `d75900b2c9b96b19dd38c612cff214c364dbc51c39a28e11074de1efce6314ac`

### 3. API Functionality (All Working)
- [x] Health Check: `/health`
- [x] Email Service: Test emails working
- [x] Google Calendar: API connected
- [x] Firebase: Database connected
- [x] Demo Booking: Full workflow working

## 🔧 Production Deployment Steps

### Step 1: Update Domain Configuration
```bash
# Edit .env.production and update:
FRONTEND_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Step 2: Deploy with PM2
```bash
# Run the deployment script
./deploy-production.sh
```

### Step 3: Configure Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 4: SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d api.yourdomain.com
```

### Step 5: Firewall Configuration
```bash
# Allow HTTP/HTTPS traffic
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
```

## 📊 Monitoring & Maintenance

### PM2 Commands
```bash
pm2 status                    # Check service status
pm2 logs daxgenai-api         # View logs
pm2 restart daxgenai-api      # Restart service
pm2 stop daxgenai-api         # Stop service
pm2 delete daxgenai-api       # Remove service
pm2 save                      # Save current configuration
pm2 startup                   # Setup auto-start on boot
```

### Health Monitoring
```bash
# Health check
curl https://api.yourdomain.com/health

# Test email service
curl -X POST https://api.yourdomain.com/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test calendar service
curl -X POST https://api.yourdomain.com/api/test-calendar
```

## 🔐 Security Considerations

### Environment Variables
- [x] JWT_SECRET: 64-character secure random string
- [x] SESSION_SECRET: 64-character secure random string
- [x] Rate limiting: 100 requests per 15 minutes
- [x] CORS: Restricted to production domains

### Firebase Security
- [x] Service account with minimal permissions
- [x] Firestore security rules configured
- [x] Database backups enabled

### API Security
- [x] Helmet.js for security headers
- [x] Rate limiting enabled
- [x] CORS properly configured
- [x] Input validation implemented

## 📈 Performance Optimization

### Current Configuration
- PM2 cluster mode with max instances
- Memory limit: 1GB per process
- Auto-restart on memory limit
- Log rotation enabled

### Monitoring
- Application logs: `./logs/`
- PM2 monitoring: `pm2 monit`
- Health check endpoint: `/health`

## 🚨 Emergency Procedures

### Service Restart
```bash
pm2 restart daxgenai-api
```

### Rollback to Previous Version
```bash
pm2 stop daxgenai-api
git checkout previous-version
npm install
pm2 start ecosystem.config.js --env production
```

### Database Backup
```bash
# Firebase automatic backups are enabled
# Manual export if needed:
firebase firestore:export ./backup-$(date +%Y%m%d)
```

## 📞 Support Information

### API Endpoints
- Health: `GET /health`
- Test Config: `GET /api/test-config`
- Test Email: `POST /api/test-email`
- Test Calendar: `POST /api/test-calendar`
- Demo Booking: `POST /api/demo/create-booking`

### Contact
- Admin Email: daxgenai@gmail.com
- Firebase Project: daxgeniai
- Service Account: daxgenai-backend@daxgeniai.iam.gserviceaccount.com

---

**Status**: ✅ Ready for Production Deployment
**Last Updated**: $(date)
**Version**: 1.0.0
