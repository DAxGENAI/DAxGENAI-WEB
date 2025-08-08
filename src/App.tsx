import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import LoadingSpinner from './components/LoadingSpinner';
import Analytics from './components/Analytics';
import ErrorBoundary from './components/ErrorBoundary';
import AnimatedBackground from './components/AnimatedBackground';
import PerformanceMonitor from './components/PerformanceMonitor';
import ScrollToTop from './components/ScrollToTop';
import ProgressIndicator from './components/ProgressIndicator';
import { useAppStore } from './store/useAppStore';
// import { authService } from './services/authService';

// Lazy load components for better performance
              const About = lazy(() => import('./components/About'));
              const Courses = lazy(() => import('./components/Courses'));
              const Testimonials = lazy(() => import('./components/Testimonials'));
              const Pricing = lazy(() => import('./components/Pricing'));
              const Blog = lazy(() => import('./components/Blog'));
              const Contact = lazy(() => import('./components/Contact'));
              const Footer = lazy(() => import('./components/Footer'));
              const FAQ = lazy(() => import('./components/FAQ'));
              const AITutor = lazy(() => import('./components/AITutor'));
              const DataVisualization = lazy(() => import('./components/DataVisualization'));
              const LiveChat = lazy(() => import('./components/LiveChat'));
              const CourseFinder = lazy(() => import('./components/CourseFinder'));
              const DemoBooking = lazy(() => import('./components/DemoBooking'));
              const BlogPage = lazy(() => import('./pages/BlogPage'));

// Main Home Page Component
const HomePage = () => {
  const { isDemoBookingOpen, closeDemoBooking } = useAppStore();
  useEffect(() => {
    // Preload critical components
    const preloadCriticalComponents = () => {
      const criticalComponents = [About, Courses, Testimonials];
      criticalComponents.forEach(component => {
        component.preload?.();
      });
    };

    // Preload after initial render
    const timer = setTimeout(preloadCriticalComponents, 2000);
    return () => clearTimeout(timer);
  }, []);

                  return (
                  <div className="min-h-screen bg-slate-900 relative">
                    <AnimatedBackground />
                    <Analytics />
                    <ProgressIndicator />
                    <Header />
                    <Hero />
                  
                    <Suspense fallback={<LoadingSpinner />}>
                      <About />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingSpinner />}>
                      <CourseFinder />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingSpinner />}>
                      <Courses />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingSpinner />}>
                      <Testimonials />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingSpinner />}>
                      <Pricing />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingSpinner />}>
                      <FAQ />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingSpinner />}>
                      <Contact />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingSpinner />}>
                      <Footer />
                    </Suspense>
                    
                    <Suspense fallback={null}>
                      <AITutor />
                    </Suspense>
                    
                    <Suspense fallback={null}>
                      <LiveChat />
                    </Suspense>
                    
                    <Suspense fallback={null}>
                      <DemoBooking isOpen={isDemoBookingOpen} onClose={closeDemoBooking} />
                    </Suspense>
                    
                    <ScrollToTop />
                    <PerformanceMonitor />
                  </div>
                );
};

function App() {
  // const { setUser, setTheme } = useAppStore();

  // useEffect(() => {
  //   // Listen for authentication state changes
  //   const unsubscribe = authService.onAuthStateChange(async (firebaseUser) => {
  //     if (firebaseUser) {
  //       try {
  //           // Get user profile from Firestore
  //           const userProfile = await authService.getUserProfile(firebaseUser.uid);
  //           if (userProfile) {
  //             setUser(userProfile);
  //             setTheme(userProfile.preferences.theme);
  //           }
  //         } catch (error) {
  //           console.error('Error loading user profile:', error);
  //         }
  //       } else {
  //         setUser(null);
  //       }
  //     });

  //     return () => unsubscribe();
  //   }, [setUser, setTheme]);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={
            <Suspense fallback={<LoadingSpinner />}>
              <BlogPage />
            </Suspense>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;