# DAxGENAI - Data Analytics & AI Training Platform

A modern, responsive web application for personalized Data Analytics and Generative AI training programs with full authentication, course management, and payment processing.

## 🚀 Features

### Core Features
- **🔐 Complete Authentication System**: Email/password and Google sign-in
- **📚 Course Management**: Full CRUD operations for courses and lessons
- **💳 Payment Processing**: Stripe integration for course purchases
- **📊 Progress Tracking**: Real-time progress monitoring
- **🤖 AI-Powered Tutor**: Multi-provider AI support (Gemini, OpenAI)
- **📱 PWA Support**: Progressive Web App capabilities
- **📈 Analytics Integration**: Google Analytics 4 tracking

### Advanced Features
- **🎨 3D Interactive Elements**: Three.js powered course cards and logo
- **🎯 Real-time Collaboration**: Live chat and code editor
- **📊 Data Visualization**: Interactive charts and analytics
- **🎭 Smooth Animations**: Framer Motion powered UI
- **🔍 Advanced Search**: Course and content search functionality
- **📱 Responsive Design**: Mobile-first approach
- **⚡ Performance Optimized**: Lazy loading and code splitting

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project
- Stripe account
- Google Analytics account

### Quick Start
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/DAxGENAI.git
   cd DAxGENAI
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp ENVIRONMENT_SETUP.md .env
   # Edit .env with your API keys
   ```

4. Start development server
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

## 🏗️ Tech Stack

### Frontend
- **React 18** + **TypeScript** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics
- **Zustand** - State management

### Backend & Services
- **Firebase** - Authentication, Firestore, Storage
- **Stripe** - Payment processing
- **Google Analytics 4** - Analytics tracking
- **Google Generative AI** - AI tutor
- **OpenAI** - Alternative AI provider

### Development Tools
- **ESLint** - Code linting
- **Vitest** - Unit testing
- **Testing Library** - Component testing
- **PWA** - Progressive Web App

## 📁 Project Structure

```
DAxGENAI/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── courses/        # Course-related components
│   │   └── ...            # Other UI components
│   ├── services/
│   │   ├── authService.ts  # Authentication logic
│   │   ├── courseService.ts # Course management
│   │   └── paymentService.ts # Payment processing
│   ├── store/
│   │   └── useAppStore.ts  # Global state management
│   ├── firebase/
│   │   └── config.ts       # Firebase configuration
│   └── tests/              # Test files
├── server/                 # Backend API
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🔧 Configuration

### Environment Variables
See `ENVIRONMENT_SETUP.md` for detailed setup instructions.

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication (Email/Password, Google)
3. Create Firestore database
4. Set up security rules
5. Configure storage

### Stripe Setup
1. Create Stripe account
2. Get API keys
3. Create products and prices
4. Set up webhooks

## 🧪 Testing

Run the test suite:
```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## 📦 Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deployment Options
- **Vercel**: Connect GitHub repository
- **Netlify**: Drag and drop build folder
- **Firebase Hosting**: `firebase deploy`
- **AWS S3 + CloudFront**: Upload build files

## 🔐 Security

- Firebase Authentication with secure rules
- Stripe webhook verification
- Environment variable protection
- CORS configuration
- Input validation and sanitization

## 📊 Performance

- Code splitting and lazy loading
- Image optimization
- PWA caching strategies
- Bundle size optimization
- Lighthouse score optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- Check the documentation in `docs/`
- Review `ENVIRONMENT_SETUP.md` for configuration help
- Open an issue for bugs or feature requests

## 🎯 Roadmap

- [ ] Advanced course analytics
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Advanced AI features
- [ ] Enterprise features
- [ ] API documentation 