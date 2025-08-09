interface MetricData {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
}

interface AlertConfig {
  metric: string;
  threshold: number;
  operator: 'gt' | 'lt' | 'eq';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
}

interface ErrorMetrics {
  errorCount: number;
  errorRate: number;
  criticalErrors: number;
  lastError?: {
    message: string;
    stack: string;
    timestamp: number;
    url: string;
    userAgent: string;
  };
}

interface UserMetrics {
  activeUsers: number;
  sessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  userEngagement: number;
}

class MonitoringService {
  private metrics: MetricData[] = [];
  private alerts: AlertConfig[] = [];
  private isEnabled: boolean = true;
  private apiEndpoint: string = import.meta.env.VITE_MONITORING_ENDPOINT || '/api/metrics';

  constructor() {
    this.initializePerformanceObserver();
    this.initializeErrorTracking();
    this.setupDefaultAlerts();
    this.startMetricsCollection();
  }

  // Performance Monitoring
  private initializePerformanceObserver() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    // Core Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.recordPerformanceMetric(entry);
      }
    });

    // Observe different types of performance entries
    try {
      observer.observe({ entryTypes: ['navigation', 'paint', 'layout-shift', 'first-input'] });
    } catch (e) {
      console.warn('Performance Observer not fully supported:', e);
    }

    // Web Vitals
    this.measureWebVitals();
  }

  private measureWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.recordMetric('lcp', lastEntry.startTime, { 
        unit: 'ms',
        threshold: '2500ms' 
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.recordMetric('fid', entry.processingStart - entry.startTime, {
          unit: 'ms',
          threshold: '100ms'
        });
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.recordMetric('cls', clsValue, {
        unit: 'score',
        threshold: '0.1'
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private recordPerformanceMetric(entry: PerformanceEntry) {
    const metricName = `performance.${entry.entryType}`;
    let value = 0;

    switch (entry.entryType) {
      case 'navigation':
        const navEntry = entry as PerformanceNavigationTiming;
        this.recordMetric('page_load_time', navEntry.loadEventEnd - navEntry.navigationStart);
        this.recordMetric('dom_content_loaded', navEntry.domContentLoadedEventEnd - navEntry.navigationStart);
        this.recordMetric('first_byte', navEntry.responseStart - navEntry.navigationStart);
        break;
      case 'paint':
        const paintEntry = entry as PerformancePaintTiming;
        this.recordMetric(`paint.${paintEntry.name}`, paintEntry.startTime);
        break;
      case 'measure':
        this.recordMetric(`custom.${entry.name}`, entry.duration);
        break;
    }
  }

  // Error Tracking
  private initializeErrorTracking() {
    if (typeof window === 'undefined') return;

    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.recordError({
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        type: 'javascript_error',
        severity: 'high'
      });
    });

    // Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.recordError({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        type: 'promise_rejection',
        severity: 'medium'
      });
    });

    // Resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.recordError({
          message: `Failed to load resource: ${(event.target as any)?.src || 'unknown'}`,
          type: 'resource_error',
          severity: 'low'
        });
      }
    }, true);
  }

  private recordError(error: any) {
    this.recordMetric('error_count', 1, {
      type: error.type,
      severity: error.severity,
      message: error.message?.substring(0, 100)
    });

    // Send error to monitoring service
    this.sendErrorToService(error);
  }

  private async sendErrorToService(error: any) {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...error,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          userId: this.getUserId(),
          sessionId: this.getSessionId()
        })
      });
    } catch (e) {
      console.warn('Failed to send error to monitoring service:', e);
    }
  }

  // User Behavior Tracking
  public trackUserInteraction(action: string, element: string, properties?: Record<string, any>) {
    this.recordMetric('user_interaction', 1, {
      action,
      element,
      ...properties
    });
  }

  public trackPageView(page: string, referrer?: string) {
    this.recordMetric('page_view', 1, {
      page,
      referrer: referrer || document.referrer,
      timestamp: Date.now().toString()
    });
  }

  public trackConversion(event: string, value?: number) {
    this.recordMetric('conversion', value || 1, {
      event,
      timestamp: Date.now().toString()
    });
  }

  // Business Metrics
  public trackDemoBooking(source: string, success: boolean) {
    this.recordMetric('demo_booking', success ? 1 : 0, {
      source,
      success: success.toString(),
      timestamp: Date.now().toString()
    });
  }

  public trackCourseEngagement(courseId: string, action: string, duration?: number) {
    this.recordMetric('course_engagement', duration || 1, {
      courseId,
      action,
      timestamp: Date.now().toString()
    });
  }

  // Core Metric Recording
  public recordMetric(name: string, value: number, tags?: Record<string, string>) {
    if (!this.isEnabled) return;

    const metric: MetricData = {
      name,
      value,
      timestamp: Date.now(),
      tags: {
        ...tags,
        environment: import.meta.env.MODE,
        version: import.meta.env.VITE_APP_VERSION || '1.0.0'
      }
    };

    this.metrics.push(metric);
    this.checkAlerts(metric);

    // Store in localStorage for persistence
    this.persistMetrics();

    // Send to monitoring service if connected
    this.sendMetricToService(metric);
  }

  // Alert System
  private setupDefaultAlerts() {
    this.alerts = [
      {
        metric: 'page_load_time',
        threshold: 3000,
        operator: 'gt',
        severity: 'medium',
        description: 'Page load time is too slow'
      },
      {
        metric: 'error_count',
        threshold: 5,
        operator: 'gt',
        severity: 'high',
        description: 'High error rate detected'
      },
      {
        metric: 'lcp',
        threshold: 2500,
        operator: 'gt',
        severity: 'medium',
        description: 'Largest Contentful Paint is slow'
      },
      {
        metric: 'cls',
        threshold: 0.1,
        operator: 'gt',
        severity: 'low',
        description: 'Layout shift detected'
      },
      {
        metric: 'fid',
        threshold: 100,
        operator: 'gt',
        severity: 'medium',
        description: 'First Input Delay is high'
      }
    ];
  }

  private checkAlerts(metric: MetricData) {
    const relevantAlerts = this.alerts.filter(alert => alert.metric === metric.name);
    
    for (const alert of relevantAlerts) {
      let triggered = false;
      
      switch (alert.operator) {
        case 'gt':
          triggered = metric.value > alert.threshold;
          break;
        case 'lt':
          triggered = metric.value < alert.threshold;
          break;
        case 'eq':
          triggered = metric.value === alert.threshold;
          break;
      }

      if (triggered) {
        this.triggerAlert(alert, metric);
      }
    }
  }

  private triggerAlert(alert: AlertConfig, metric: MetricData) {
    const alertData = {
      ...alert,
      actualValue: metric.value,
      timestamp: metric.timestamp,
      tags: metric.tags
    };

    // Log to console in development
    if (import.meta.env.MODE === 'development') {
      console.warn(`🚨 Alert Triggered: ${alert.description}`, alertData);
    }

    // Send to monitoring service
    this.sendAlertToService(alertData);

    // Store in localStorage for debugging
    const alerts = JSON.parse(localStorage.getItem('monitoring_alerts') || '[]');
    alerts.push(alertData);
    localStorage.setItem('monitoring_alerts', JSON.stringify(alerts.slice(-50))); // Keep last 50
  }

  // Metrics Collection and Reporting
  private startMetricsCollection() {
    // Collect metrics every 30 seconds
    setInterval(() => {
      this.collectSystemMetrics();
      this.sendBatchMetrics();
    }, 30000);

    // Collect user session metrics
    this.trackSessionMetrics();
  }

  private collectSystemMetrics() {
    // Memory usage
    if (performance.memory) {
      this.recordMetric('memory_used', performance.memory.usedJSHeapSize);
      this.recordMetric('memory_total', performance.memory.jsHeapSizeLimit);
    }

    // Connection information
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      this.recordMetric('network_downlink', connection.downlink || 0);
      this.recordMetric('network_rtt', connection.rtt || 0);
    }

    // Browser performance
    this.recordMetric('active_tab_time', this.getActiveTabTime());
  }

  private trackSessionMetrics() {
    const sessionStart = Date.now();
    let lastActivity = sessionStart;

    // Track user activity
    ['click', 'scroll', 'keypress'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        lastActivity = Date.now();
      });
    });

    // Track session duration and activity
    setInterval(() => {
      const sessionDuration = Date.now() - sessionStart;
      const inactiveTime = Date.now() - lastActivity;
      
      this.recordMetric('session_duration', sessionDuration);
      this.recordMetric('inactive_time', inactiveTime);
    }, 60000); // Every minute
  }

  // API Communication
  private async sendMetricToService(metric: MetricData) {
    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric)
      });
    } catch (e) {
      // Silently fail - don't break the app for monitoring
    }
  }

  private async sendBatchMetrics() {
    if (this.metrics.length === 0) return;

    try {
      const batch = this.metrics.splice(0, 100); // Send up to 100 metrics at a time
      
      await fetch(`${this.apiEndpoint}/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics: batch,
          metadata: {
            userId: this.getUserId(),
            sessionId: this.getSessionId(),
            timestamp: Date.now()
          }
        })
      });
    } catch (e) {
      console.warn('Failed to send batch metrics:', e);
    }
  }

  private async sendAlertToService(alert: any) {
    try {
      await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert)
      });
    } catch (e) {
      console.warn('Failed to send alert:', e);
    }
  }

  // Utility Methods
  private persistMetrics() {
    try {
      const recentMetrics = this.metrics.slice(-100); // Keep last 100 metrics
      localStorage.setItem('monitoring_metrics', JSON.stringify(recentMetrics));
    } catch (e) {
      // Storage quota exceeded, clear old data
      localStorage.removeItem('monitoring_metrics');
    }
  }

  private getUserId(): string {
    return localStorage.getItem('userId') || 'anonymous';
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  private getActiveTabTime(): number {
    return parseInt(sessionStorage.getItem('activeTabTime') || '0');
  }

  // Public API
  public getMetrics(metricName?: string): MetricData[] {
    if (metricName) {
      return this.metrics.filter(m => m.name === metricName);
    }
    return [...this.metrics];
  }

  public getRecentAlerts(): any[] {
    return JSON.parse(localStorage.getItem('monitoring_alerts') || '[]');
  }

  public enable() {
    this.isEnabled = true;
  }

  public disable() {
    this.isEnabled = false;
  }

  public clearData() {
    this.metrics = [];
    localStorage.removeItem('monitoring_metrics');
    localStorage.removeItem('monitoring_alerts');
  }

  // Custom performance marks
  public mark(name: string) {
    if (performance.mark) {
      performance.mark(name);
    }
  }

  public measure(name: string, startMark: string, endMark?: string) {
    if (performance.measure) {
      try {
        performance.measure(name, startMark, endMark);
        const measures = performance.getEntriesByName(name, 'measure');
        if (measures.length > 0) {
          this.recordMetric(`custom.${name}`, measures[measures.length - 1].duration);
        }
      } catch (e) {
        console.warn('Failed to create performance measure:', e);
      }
    }
  }
}

// Export singleton instance
export const monitoringService = new MonitoringService();

// Export types for use in other components
export type {
  MetricData,
  AlertConfig,
  PerformanceMetrics,
  ErrorMetrics,
  UserMetrics
};
