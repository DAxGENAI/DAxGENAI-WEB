module.exports = {
  apps: [{
    name: 'daxgenai-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 5001
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5001
    },
    // Logging
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Monitoring
    watch: false,
    max_memory_restart: '1G',
    
    // Restart policy
    min_uptime: '10s',
    max_restarts: 10,
    
    // Environment variables
    env_file: '.env.production'
  }]
};
