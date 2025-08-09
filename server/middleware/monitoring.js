const express = require('express');
const { promisify } = require('util');

// Enhanced monitoring middleware
class MonitoringMiddleware {
  constructor() {
    this.metrics = new Map();
    this.alerts = [];
    this.healthChecks = new Map();
    this.startTime = Date.now();
    
    // Initialize default health checks
    this.setupDefaultHealthChecks();
    
    // Start metrics collection
    this.startMetricsCollection();
  }

  // Request monitoring middleware
  requestMetrics() {
    return (req, res, next) => {
      const startTime = Date.now();
      const originalSend = res.send;

      // Track request start
      this.incrementMetric('requests_total');
      this.incrementMetric(`requests_${req.method.toLowerCase()}`);

      // Override res.send to capture response metrics
      res.send = function(body) {
        const duration = Date.now() - startTime;
        const contentLength = Buffer.byteLength(body || '', 'utf8');

        // Record metrics
        this.recordMetric('request_duration_ms', duration, {
          method: req.method,
          route: req.route?.path || req.path,
          status_code: res.statusCode.toString()
        });

        this.recordMetric('response_size_bytes', contentLength, {
          method: req.method,
          route: req.route?.path || req.path
        });

        // Count status codes
        this.incrementMetric(`status_code_${res.statusCode}`);
        
        if (res.statusCode >= 400) {
          this.incrementMetric('errors_total');
          if (res.statusCode >= 500) {
            this.incrementMetric('server_errors_total');
          }
        }

        return originalSend.call(this, body);
      }.bind(this);

      next();
    };
  }

  // Error tracking middleware
  errorTracking() {
    return (error, req, res, next) => {
      // Record error metrics
      this.incrementMetric('errors_total');
      this.recordMetric('error_occurred', 1, {
        error_type: error.name,
        route: req.route?.path || req.path,
        method: req.method,
        status_code: res.statusCode?.toString() || '500'
      });

      // Log detailed error information
      const errorInfo = {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: req.body,
        timestamp: new Date().toISOString(),
        requestId: req.headers['x-request-id'] || 'unknown'
      };

      console.error('Application Error:', errorInfo);

      // Send error to external monitoring service
      this.sendErrorToExternalService(errorInfo);

      // Check if this triggers any alerts
      this.checkErrorAlerts();

      next(error);
    };
  }

  // Health check endpoints
  setupHealthRoutes(app) {
    // Basic health check
    app.get('/health', (req, res) => {
      const health = this.getHealthStatus();
      const statusCode = health.status === 'healthy' ? 200 : 503;
      res.status(statusCode).json(health);
    });

    // Detailed health check
    app.get('/health/detailed', (req, res) => {
      const detailedHealth = this.getDetailedHealthStatus();
      const statusCode = detailedHealth.status === 'healthy' ? 200 : 503;
      res.status(statusCode).json(detailedHealth);
    });

    // Metrics endpoint
    app.get('/metrics', (req, res) => {
      res.json(this.getMetricsSnapshot());
    });

    // Live metrics (real-time)
    app.get('/metrics/live', (req, res) => {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const sendMetrics = () => {
        const metrics = this.getMetricsSnapshot();
        res.write(`data: ${JSON.stringify(metrics)}\n\n`);
      };

      const interval = setInterval(sendMetrics, 5000); // Send every 5 seconds

      req.on('close', () => {
        clearInterval(interval);
      });

      // Send initial metrics
      sendMetrics();
    });

    // Alerts endpoint
    app.get('/alerts', (req, res) => {
      res.json({
        active_alerts: this.getActiveAlerts(),
        recent_alerts: this.getRecentAlerts()
      });
    });
  }

  // Health check functions
  setupDefaultHealthChecks() {
    // Database health check
    this.healthChecks.set('database', async () => {
      try {
        // Add your database ping here
        // For Firebase, we could check connection status
        return { status: 'healthy', latency: 0 };
      } catch (error) {
        return { status: 'unhealthy', error: error.message };
      }
    });

    // External API health checks
    this.healthChecks.set('email_service', async () => {
      try {
        // Check if email service is accessible
        return { status: 'healthy' };
      } catch (error) {
        return { status: 'unhealthy', error: error.message };
      }
    });

    this.healthChecks.set('calendar_service', async () => {
      try {
        // Check Google Calendar API
        return { status: 'healthy' };
      } catch (error) {
        return { status: 'unhealthy', error: error.message };
      }
    });

    // Memory health check
    this.healthChecks.set('memory', async () => {
      const memUsage = process.memoryUsage();
      const memUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
      
      if (memUsagePercent > 90) {
        return { status: 'unhealthy', usage: `${memUsagePercent.toFixed(2)}%` };
      }
      
      return { status: 'healthy', usage: `${memUsagePercent.toFixed(2)}%` };
    });

    // CPU health check
    this.healthChecks.set('cpu', async () => {
      const usage = process.cpuUsage();
      const systemTime = usage.system / 1000000; // Convert to seconds
      
      if (systemTime > 5) { // More than 5 seconds of system time
        return { status: 'degraded', system_time: `${systemTime}s` };
      }
      
      return { status: 'healthy', system_time: `${systemTime}s` };
    });
  }

  async getHealthStatus() {
    const checks = await this.runHealthChecks();
    const unhealthyChecks = Object.values(checks).filter(check => check.status === 'unhealthy');
    
    return {
      status: unhealthyChecks.length === 0 ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: Date.now() - this.startTime,
      checks: Object.keys(checks).length,
      healthy: Object.keys(checks).length - unhealthyChecks.length,
      unhealthy: unhealthyChecks.length
    };
  }

  async getDetailedHealthStatus() {
    const checks = await this.runHealthChecks();
    const systemMetrics = this.getSystemMetrics();
    
    return {
      status: Object.values(checks).every(check => check.status === 'healthy') ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: Date.now() - this.startTime,
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks,
      system: systemMetrics,
      metrics: this.getMetricsSnapshot()
    };
  }

  async runHealthChecks() {
    const results = {};
    
    for (const [name, checkFn] of this.healthChecks) {
      try {
        results[name] = await checkFn();
      } catch (error) {
        results[name] = { status: 'unhealthy', error: error.message };
      }
    }
    
    return results;
  }

  getSystemMetrics() {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    return {
      memory: {
        rss: memUsage.rss,
        heapTotal: memUsage.heapTotal,
        heapUsed: memUsage.heapUsed,
        external: memUsage.external,
        arrayBuffers: memUsage.arrayBuffers
      },
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system
      },
      uptime: process.uptime(),
      pid: process.pid,
      platform: process.platform,
      nodeVersion: process.version
    };
  }

  // Metrics recording and retrieval
  recordMetric(name, value, tags = {}) {
    const timestamp = Date.now();
    const metricKey = `${name}_${JSON.stringify(tags)}`;
    
    if (!this.metrics.has(metricKey)) {
      this.metrics.set(metricKey, []);
    }
    
    const metricData = this.metrics.get(metricKey);
    metricData.push({ value, timestamp, tags });
    
    // Keep only last 1000 data points per metric
    if (metricData.length > 1000) {
      metricData.shift();
    }
  }

  incrementMetric(name, tags = {}) {
    const metricKey = `${name}_counter`;
    const current = this.metrics.get(metricKey) || 0;
    this.metrics.set(metricKey, current + 1);
  }

  getMetricsSnapshot() {
    const snapshot = {
      timestamp: Date.now(),
      counters: {},
      gauges: {},
      histograms: {}
    };

    for (const [key, value] of this.metrics) {
      if (key.endsWith('_counter')) {
        const metricName = key.replace('_counter', '');
        snapshot.counters[metricName] = value;
      } else if (Array.isArray(value)) {
        const metricName = key.split('_')[0];
        if (!snapshot.histograms[metricName]) {
          snapshot.histograms[metricName] = [];
        }
        snapshot.histograms[metricName] = value.slice(-100); // Last 100 values
      }
    }

    // Add system metrics as gauges
    const systemMetrics = this.getSystemMetrics();
    snapshot.gauges = {
      memory_heap_used: systemMetrics.memory.heapUsed,
      memory_heap_total: systemMetrics.memory.heapTotal,
      cpu_user: systemMetrics.cpu.user,
      cpu_system: systemMetrics.cpu.system,
      uptime: systemMetrics.uptime
    };

    return snapshot;
  }

  // Alerting system
  checkErrorAlerts() {
    const errorCount = this.metrics.get('errors_total_counter') || 0;
    const timeWindow = 5 * 60 * 1000; // 5 minutes
    const now = Date.now();

    // Check error rate alert
    if (errorCount > 10) { // More than 10 errors
      this.triggerAlert({
        type: 'high_error_rate',
        severity: 'warning',
        message: `High error rate detected: ${errorCount} errors`,
        timestamp: now,
        metrics: { error_count: errorCount }
      });
    }

    if (errorCount > 50) { // More than 50 errors
      this.triggerAlert({
        type: 'critical_error_rate',
        severity: 'critical',
        message: `Critical error rate: ${errorCount} errors`,
        timestamp: now,
        metrics: { error_count: errorCount }
      });
    }
  }

  triggerAlert(alert) {
    alert.id = `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.alerts.push(alert);

    // Log alert
    console.warn(`🚨 Alert Triggered [${alert.severity.toUpperCase()}]: ${alert.message}`, alert);

    // Send to external monitoring service
    this.sendAlertToExternalService(alert);

    // Keep only last 100 alerts
    if (this.alerts.length > 100) {
      this.alerts.shift();
    }
  }

  getActiveAlerts() {
    const now = Date.now();
    const activeWindow = 30 * 60 * 1000; // 30 minutes
    
    return this.alerts.filter(alert => 
      (now - alert.timestamp) < activeWindow
    );
  }

  getRecentAlerts() {
    return this.alerts.slice(-20); // Last 20 alerts
  }

  // External service integration
  async sendErrorToExternalService(errorInfo) {
    // Integration with external monitoring services
    // Examples: Sentry, DataDog, New Relic, etc.
    
    try {
      // Example: Send to custom monitoring endpoint
      if (process.env.MONITORING_WEBHOOK_URL) {
        await fetch(process.env.MONITORING_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'error',
            data: errorInfo,
            service: 'daxgenai-api',
            environment: process.env.NODE_ENV
          })
        });
      }
    } catch (error) {
      console.error('Failed to send error to external service:', error);
    }
  }

  async sendAlertToExternalService(alert) {
    try {
      // Send to Slack webhook
      if (process.env.SLACK_WEBHOOK_URL) {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🚨 DAxGENAI Alert [${alert.severity.toUpperCase()}]`,
            attachments: [{
              color: alert.severity === 'critical' ? 'danger' : 'warning',
              fields: [
                { title: 'Type', value: alert.type, short: true },
                { title: 'Message', value: alert.message, short: false },
                { title: 'Timestamp', value: new Date(alert.timestamp).toISOString(), short: true }
              ]
            }]
          })
        });
      }

      // Send to Discord webhook
      if (process.env.DISCORD_WEBHOOK_URL) {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [{
              title: `🚨 DAxGENAI Alert - ${alert.type}`,
              description: alert.message,
              color: alert.severity === 'critical' ? 15158332 : 16776960, // Red or Yellow
              timestamp: new Date(alert.timestamp).toISOString(),
              fields: [
                { name: 'Severity', value: alert.severity, inline: true },
                { name: 'Environment', value: process.env.NODE_ENV, inline: true }
              ]
            }]
          })
        });
      }
    } catch (error) {
      console.error('Failed to send alert to external service:', error);
    }
  }

  // Performance monitoring
  startMetricsCollection() {
    // Collect system metrics every 30 seconds
    setInterval(() => {
      const systemMetrics = this.getSystemMetrics();
      
      this.recordMetric('memory_usage', systemMetrics.memory.heapUsed);
      this.recordMetric('memory_percentage', (systemMetrics.memory.heapUsed / systemMetrics.memory.heapTotal) * 100);
      this.recordMetric('cpu_user_time', systemMetrics.cpu.user);
      this.recordMetric('cpu_system_time', systemMetrics.cpu.system);
      this.recordMetric('uptime', systemMetrics.uptime);
      
      // Check for memory alerts
      const memoryPercentage = (systemMetrics.memory.heapUsed / systemMetrics.memory.heapTotal) * 100;
      if (memoryPercentage > 80) {
        this.triggerAlert({
          type: 'high_memory_usage',
          severity: memoryPercentage > 90 ? 'critical' : 'warning',
          message: `High memory usage: ${memoryPercentage.toFixed(2)}%`,
          timestamp: Date.now(),
          metrics: { memory_percentage: memoryPercentage }
        });
      }
    }, 30000);

    // Collect request rate metrics every minute
    setInterval(() => {
      const totalRequests = this.metrics.get('requests_total_counter') || 0;
      this.recordMetric('request_rate_per_minute', totalRequests);
      
      // Reset counter for next minute
      this.metrics.set('requests_total_counter', 0);
    }, 60000);
  }
}

// Export singleton instance
const monitoring = new MonitoringMiddleware();

module.exports = monitoring;
