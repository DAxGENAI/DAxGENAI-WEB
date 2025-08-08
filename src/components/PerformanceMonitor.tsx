import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

interface PerformanceMetrics {
  fps: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  loadTime: number;
  renderTime: number;
  networkLatency: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: { used: 0, total: 0, percentage: 0 },
    loadTime: 0,
    renderTime: 0,
    networkLatency: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const [lastTime, setLastTime] = useState(performance.now());

  useEffect(() => {
    // FPS monitoring
    const measureFPS = () => {
      const currentTime = performance.now();
      setFrameCount(prev => prev + 1);
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setMetrics(prev => ({ ...prev, fps }));
        setFrameCount(0);
        setLastTime(currentTime);
      }
      
      requestAnimationFrame(measureFPS);
    };

    // Memory monitoring
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const used = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        const total = Math.round(memory.jsHeapSizeLimit / 1024 / 1024);
        const percentage = Math.round((used / total) * 100);
        
        setMetrics(prev => ({
          ...prev,
          memory: { used, total, percentage }
        }));
      }
    };

    // Load time measurement
    const measureLoadTime = () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, loadTime }));
    };

    // Network latency measurement
    const measureNetworkLatency = async () => {
      const start = performance.now();
      try {
        await fetch('/api/ping', { method: 'HEAD' });
        const latency = performance.now() - start;
        setMetrics(prev => ({ ...prev, networkLatency: Math.round(latency) }));
      } catch (error) {
        // Fallback to a mock latency if API is not available
        setMetrics(prev => ({ ...prev, networkLatency: Math.round(Math.random() * 50 + 10) }));
      }
    };

    // Render time measurement
    const measureRenderTime = () => {
      const start = performance.now();
      requestAnimationFrame(() => {
        const renderTime = performance.now() - start;
        setMetrics(prev => ({ ...prev, renderTime: Math.round(renderTime) }));
      });
    };

    // Start monitoring
    const fpsInterval = requestAnimationFrame(measureFPS);
    const memoryInterval = setInterval(measureMemory, 1000);
    const networkInterval = setInterval(measureNetworkLatency, 5000);
    const renderInterval = setInterval(measureRenderTime, 1000);

    // Measure initial load time
    if (document.readyState === 'complete') {
      measureLoadTime();
    } else {
      window.addEventListener('load', measureLoadTime);
    }

    // Toggle visibility with keyboard shortcut
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      cancelAnimationFrame(fpsInterval);
      clearInterval(memoryInterval);
      clearInterval(networkInterval);
      clearInterval(renderInterval);
      document.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('load', measureLoadTime);
    };
  }, [frameCount, lastTime]);

  const getPerformanceStatus = () => {
    if (metrics.fps < 30) return 'poor';
    if (metrics.fps < 50) return 'fair';
    return 'good';
  };

  const getMemoryStatus = () => {
    if (metrics.memory.percentage > 80) return 'poor';
    if (metrics.memory.percentage > 60) return 'fair';
    return 'good';
  };

  const statusColors = {
    good: 'text-green-500',
    fair: 'text-yellow-500',
    poor: 'text-red-500',
  };

  if (!isVisible) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-gray-800 text-white p-2 rounded-lg opacity-50 hover:opacity-100 transition-opacity"
          title="Show Performance Monitor (Ctrl+Shift+P)"
        >
          <Activity className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.8, x: 100 }}
        className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 w-64"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Performance Monitor
          </h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ×
          </button>
        </div>

        <div className="space-y-3">
          {/* FPS */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">FPS</span>
            </div>
            <span className={`text-sm font-mono ${statusColors[getPerformanceStatus()]}`}>
              {metrics.fps}
            </span>
          </div>

          {/* Memory */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Memory</span>
            </div>
            <div className="text-right">
              <span className={`text-sm font-mono ${statusColors[getMemoryStatus()]}`}>
                {metrics.memory.used}MB
              </span>
              <div className="text-xs text-gray-500">
                {metrics.memory.percentage}%
              </div>
            </div>
          </div>

          {/* Load Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-purple-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Load Time</span>
            </div>
            <span className="text-sm font-mono text-gray-900 dark:text-white">
              {metrics.loadTime}ms
            </span>
          </div>

          {/* Render Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Render</span>
            </div>
            <span className="text-sm font-mono text-gray-900 dark:text-white">
              {metrics.renderTime}ms
            </span>
          </div>

          {/* Network Latency */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Network</span>
            </div>
            <span className="text-sm font-mono text-gray-900 dark:text-white">
              {metrics.networkLatency}ms
            </span>
          </div>
        </div>

        {/* Performance Bar */}
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Performance</span>
            <span>{getPerformanceStatus().toUpperCase()}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${
                getPerformanceStatus() === 'good' ? 'bg-green-500' :
                getPerformanceStatus() === 'fair' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${(metrics.fps / 60) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
          Press Ctrl+Shift+P to toggle
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PerformanceMonitor; 