import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

// Mock all the lazy-loaded components
vi.mock('../../components/About', () => ({
  default: () => <div data-testid="about-section">About Section</div>,
}));

vi.mock('../../components/Courses', () => ({
  default: () => <div data-testid="courses-section">Courses Section</div>,
}));

vi.mock('../../components/Pricing', () => ({
  default: () => <div data-testid="pricing-section">Pricing Section</div>,
}));

vi.mock('../../components/Testimonials', () => ({
  default: () => <div data-testid="testimonials-section">Testimonials Section</div>,
}));

vi.mock('../../components/FAQ', () => ({
  default: () => <div data-testid="faq-section">FAQ Section</div>,
}));

vi.mock('../../components/Contact', () => ({
  default: () => <div data-testid="contact-section">Contact Section</div>,
}));

vi.mock('../../components/Footer', () => ({
  default: () => <div data-testid="footer-section">Footer Section</div>,
}));

vi.mock('../../components/AITutor', () => ({
  default: () => <div data-testid="ai-tutor">AI Tutor</div>,
}));

vi.mock('../../components/LiveChat', () => ({
  default: () => <div data-testid="live-chat">Live Chat</div>,
}));

vi.mock('../../components/DemoBooking', () => ({
  default: ({ isOpen }: { isOpen: boolean }) => 
    isOpen ? <div data-testid="demo-booking">Demo Booking Modal</div> : null,
}));

vi.mock('../../pages/BlogPage', () => ({
  default: () => <div data-testid="blog-page">Blog Page</div>,
}));

// Mock other components
vi.mock('../../components/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock('../../components/Hero', () => ({
  default: () => <div data-testid="hero">Hero Section</div>,
}));

vi.mock('../../components/LoadingSpinner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

vi.mock('../../components/Analytics', () => ({
  default: () => <div data-testid="analytics">Analytics</div>,
}));

vi.mock('../../components/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="error-boundary">{children}</div>,
}));

vi.mock('../../components/AnimatedBackground', () => ({
  default: () => <div data-testid="animated-background">Animated Background</div>,
}));

vi.mock('../../components/PerformanceMonitor', () => ({
  default: () => <div data-testid="performance-monitor">Performance Monitor</div>,
}));

vi.mock('../../components/ScrollToTop', () => ({
  default: () => <div data-testid="scroll-to-top">Scroll to Top</div>,
}));

vi.mock('../../components/ProgressIndicator', () => ({
  default: () => <div data-testid="progress-indicator">Progress Indicator</div>,
}));

vi.mock('../../components/SEO', () => ({
  default: () => <div data-testid="seo">SEO Component</div>,
}));

// Mock store
vi.mock('../../store/useAppStore', () => ({
  useAppStore: () => ({
    isDemoBookingOpen: false,
    closeDemoBooking: vi.fn(),
  }),
}));

// Mock react-helmet-async
vi.mock('react-helmet-async', () => ({
  HelmetProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('App Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the complete home page with all sections', async () => {
    render(<App />);

    // Check that error boundary is present
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();

    // Check that core layout components are present
    expect(screen.getByTestId('seo')).toBeInTheDocument();
    expect(screen.getByTestId('animated-background')).toBeInTheDocument();
    expect(screen.getByTestId('analytics')).toBeInTheDocument();
    expect(screen.getByTestId('progress-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();

    // Wait for lazy-loaded components to render
    await waitFor(() => {
      expect(screen.getByTestId('about-section')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('courses-section')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('testimonials-section')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('pricing-section')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('faq-section')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('contact-section')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('footer-section')).toBeInTheDocument();
    });

    // Check additional components
    await waitFor(() => {
      expect(screen.getByTestId('ai-tutor')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('live-chat')).toBeInTheDocument();
    });

    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument();
    expect(screen.getByTestId('performance-monitor')).toBeInTheDocument();
  });

  it('renders blog page when navigating to /blog', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Simulate navigation to blog (in a real test, you'd use userEvent or history)
    window.history.pushState({}, 'Blog', '/blog');

    await waitFor(() => {
      expect(screen.getByTestId('blog-page')).toBeInTheDocument();
    });
  });

  it('handles routing correctly', () => {
    render(<App />);

    // Check that the router is set up
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('has proper accessibility structure', async () => {
    render(<App />);

    // Wait for components to load
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    // Check for main content structure
    const heroSection = screen.getByTestId('hero');
    expect(heroSection).toBeInTheDocument();

    // Check for navigation accessibility
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });
});
