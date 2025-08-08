import React, { useEffect } from 'react';

// Analytics tracking utility
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Google Analytics 4 tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
  
  // Custom analytics tracking
  console.log('Analytics Event:', eventName, properties);
  
  // Send to your analytics endpoint
  fetch('/api/analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: eventName,
      properties,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }),
  }).catch(console.error);
};

// Page view tracking
export const trackPageView = (pageName: string) => {
  trackEvent('page_view', { page_name: pageName });
};

// Course interaction tracking
export const trackCourseView = (courseName: string) => {
  trackEvent('course_view', { course_name: courseName });
};

// Contact form tracking
export const trackContactForm = (formType: string) => {
  trackEvent('contact_form_submit', { form_type: formType });
};

// AI Tutor interaction tracking
export const trackAITutorInteraction = (interactionType: string, message?: string) => {
  trackEvent('ai_tutor_interaction', { 
    interaction_type: interactionType,
    message_length: message?.length || 0 
  });
};

// Pricing package tracking
export const trackPricingClick = (packageName: string) => {
  trackEvent('pricing_click', { package_name: packageName });
};

// Demo booking tracking
export const trackDemoBooking = (source: string) => {
  trackEvent('demo_booking', { source });
};

// Analytics Provider Component
const Analytics: React.FC = () => {
  useEffect(() => {
    // Initialize Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function() {
      (window as any).dataLayer.push(arguments);
    };
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', 'GA_MEASUREMENT_ID');

    // Track initial page view
    trackPageView('home');

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default Analytics; 