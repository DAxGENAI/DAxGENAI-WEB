const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin
try {
  const serviceAccount = require('./credentials/service-account-key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'daxgenai-dfdc3' // Use the correct project ID from service account
  });
  console.log('🔥 Firebase Admin initialized successfully');
  console.log('📁 Using Project ID: daxgenai-dfdc3');
  console.log('📁 Service Account Project: ' + serviceAccount.project_id);
} catch (error) {
  console.log('⚠️ Firebase Admin already initialized or not configured:', error.message);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://192.168.0.126:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'DAxGENAI Demo Booking API'
  });
});

// API routes
app.use('/api', require('./api/send-demo-email'));
app.use('/api', require('./api/test-endpoints'));
app.use('/api/demo', require('./api/demo-booking'));
app.use('/api', require('./api/analytics'));
app.use('/api', require('./api/test-firebase'));
app.use('/api', require('./api/debug-connection'));
app.use('/api', require('./api/test-meet-link'));
app.use('/api', require('./api/create-meet-link'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Endpoint not found' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DAxGENAI Demo Booking API running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  console.log(`📅 Google Calendar: ${process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'Configured' : 'Not configured'}`);
  console.log(`🔐 Security: ${process.env.JWT_SECRET ? 'Configured' : 'Not configured'}`);
  console.log(`⚡ Rate Limiting: ${process.env.RATE_LIMIT_MAX_REQUESTS || 100} requests per ${process.env.RATE_LIMIT_WINDOW_MS || 900000}ms`);
});

module.exports = app;
