# 📚 DAxGENAI API Documentation

## 🔗 Base URL
```
Development: http://localhost:5001
Production: https://api.daxgenai.com
```

## 🔐 Authentication
Most endpoints don't require authentication. For protected endpoints (future implementation):
```bash
Authorization: Bearer <jwt_token>
```

## 📡 Endpoints Overview

### 🔍 Health & Status
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| GET | `/api/test-config` | Configuration validation |

### 📧 Demo Booking
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/demo/create-booking` | Create demo booking |
| POST | `/api/send-demo-email` | Send confirmation email |

### 🧪 Testing & Debug
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/test-email` | Test email functionality |
| POST | `/api/test-calendar` | Test calendar integration |
| GET | `/api/debug-connection` | Debug connection status |

### 📊 Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analytics` | Track analytics events |

### 📅 Calendar
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/create-meet-link` | Create Google Meet link |
| POST | `/api/test-meet-link` | Test Meet link creation |

---

## 📖 Detailed Endpoints

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "DAxGENAI Demo Booking API"
}
```

---

### Create Demo Booking
```http
POST /api/demo/create-booking
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Tech Corp",
  "role": "Data Analyst",
  "experience": "Beginner",
  "goals": "Learn data analysis fundamentals",
  "preferredTime": "10:00",
  "preferredDate": "2024-01-20",
  "timezone": "Asia/Kolkata",
  "trainingInterest": "Python for Data Science",
  "source": "website",
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "winter2024"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "bookingId": "booking_abc123",
  "message": "Demo booking created successfully",
  "data": {
    "bookingId": "booking_abc123",
    "googleMeetLink": "https://meet.google.com/demo-booking_abc123-20240120",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

---

### Send Demo Email
```http
POST /api/send-demo-email
Content-Type: application/json
```

**Request Body:**
```json
{
  "bookingData": {
    "name": "John Doe",
    "email": "john@example.com",
    "preferredDate": "2024-01-20",
    "preferredTime": "10:00"
  },
  "bookingId": "booking_abc123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Confirmation email sent successfully",
  "emailId": "email_def456"
}
```

---

### Analytics Tracking
```http
POST /api/analytics
Content-Type: application/json
```

**Request Body:**
```json
{
  "eventName": "demo_booking_started",
  "properties": {
    "source": "website",
    "page": "/courses"
  },
  "sessionId": "session_xyz789",
  "userId": "user_123",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Event tracked successfully"
}
```

---

### Test Email
```http
POST /api/test-email
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "test@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Test email sent successfully"
}
```

---

### Configuration Test
```http
GET /api/test-config
```

**Response:**
```json
{
  "success": true,
  "configuration": {
    "emailService": "configured",
    "calendarService": "configured",
    "databaseService": "configured",
    "securityFeatures": "enabled"
  },
  "environment": "production"
}
```

---

## 🚨 Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad request / Validation error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Too many requests (rate limited) |
| 500 | Internal server error |

---

## 📋 Common Error Responses

### Rate Limiting
```json
{
  "success": false,
  "error": "Too many requests",
  "message": "Rate limit exceeded. Try again in 15 minutes.",
  "retryAfter": 900
}
```

### Validation Error
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Email is required"
    },
    {
      "field": "phone",
      "message": "Please provide a valid phone number"
    }
  ]
}
```

### Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Something went wrong. Please try again later.",
  "requestId": "req_abc123"
}
```

---

## 🔧 Request/Response Headers

### Common Request Headers
```http
Content-Type: application/json
Accept: application/json
User-Agent: DAxGENAI-Frontend/1.0.0
```

### Common Response Headers
```http
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1642597200
X-Request-ID: req_abc123
```

---

## 🔍 Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Headers:** Rate limit info included in response headers
- **Exceeded:** 429 status with retry information

---

## 🌐 CORS

**Allowed Origins:**
- `http://localhost:3000` (development)
- `https://daxgenai.com` (production)
- `https://www.daxgenai.com` (production)

**Allowed Methods:** GET, POST, PUT, DELETE, OPTIONS
**Allowed Headers:** Content-Type, Authorization

---

## 📊 Analytics Events

### Standard Events
| Event Name | Description | Properties |
|------------|-------------|------------|
| `page_view` | Page visited | `page`, `referrer` |
| `demo_booking_started` | Demo form opened | `source`, `page` |
| `demo_booking_completed` | Demo booking submitted | `trainingInterest`, `experience` |
| `course_view` | Course page viewed | `courseId`, `courseName` |
| `pricing_click` | Pricing package clicked | `packageName`, `price` |

---

## 🧪 Testing

### Using cURL
```bash
# Health check
curl https://api.daxgenai.com/health

# Create demo booking
curl -X POST https://api.daxgenai.com/api/demo/create-booking \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "preferredDate": "2024-01-20",
    "preferredTime": "10:00",
    "trainingInterest": "Python for Data Science"
  }'
```

### Using JavaScript
```javascript
// Create demo booking
const response = await fetch('/api/demo/create-booking', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    preferredDate: '2024-01-20',
    preferredTime: '10:00',
    trainingInterest: 'Python for Data Science'
  })
});

const data = await response.json();
console.log(data);
```

---

## 📱 SDKs & Libraries

### JavaScript/TypeScript
```javascript
import { DAxGENAIAPI } from '@daxgenai/api-client';

const api = new DAxGENAIAPI({
  baseURL: 'https://api.daxgenai.com',
  apiKey: 'your-api-key' // for future authentication
});

// Create booking
const booking = await api.demo.createBooking({
  name: 'John Doe',
  email: 'john@example.com',
  // ... other fields
});
```

---

## 🔄 Webhooks (Future Feature)

### Event Types
- `booking.created`
- `booking.confirmed` 
- `booking.cancelled`
- `email.sent`
- `email.failed`

### Webhook Payload
```json
{
  "event": "booking.created",
  "data": {
    "bookingId": "booking_abc123",
    "userEmail": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 📞 Support

- **Documentation:** [https://docs.daxgenai.com](https://docs.daxgenai.com)
- **Email:** api-support@daxgenai.com
- **Status Page:** [https://status.daxgenai.com](https://status.daxgenai.com)
