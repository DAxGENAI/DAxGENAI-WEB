import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Play, Mic, Volume2, Brain, Zap } from 'lucide-react';

const ApiShowcase = () => {
  const [activeTab, setActiveTab] = useState('tts');

  const apis = [
    {
      id: 'tts',
      name: 'Text to Speech',
      icon: Volume2,
      description: 'Lightning fast, humanlike voice for real-time AI and high throughput applications.',
      code: `curl -X POST https://api.daxgenai.com/v1/speech \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, this is DAxGENAI speaking!",
    "voice": "nova",
    "model": "nova-2"
  }'`,
      features: ['30% more accurate', '3-5x cheaper', 'Up to 40x faster']
    },
    {
      id: 'stt',
      name: 'Speech to Text',
      icon: Mic,
      description: 'Transcribe speech with unmatched accuracy, speed, and cost.',
      code: `curl -X POST https://api.daxgenai.com/v1/listen \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: audio/wav" \
  --data-binary @audio.wav`,
      features: ['Real-time transcription', 'Multi-language support', 'Speaker diarization']
    },
    {
      id: 'ai',
      name: 'Audio Intelligence',
      icon: Brain,
      description: 'Advanced audio intelligence for Enterprise-scale analysis.',
      code: `curl -X POST https://api.daxgenai.com/v1/analyze \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "audio_url": "https://example.com/audio.wav",
    "features": ["sentiment", "intent", "topics"]
  }'`,
      features: ['Sentiment analysis', 'Intent detection', 'Topic extraction']
    },
    {
      id: 'agent',
      name: 'Voice Agent API',
      icon: Zap,
      description: 'A unified voice-to-voice API that enables natural-sounding conversations.',
      code: `curl -X POST https://api.daxgenai.com/v1/agent \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_id": "conv_123",
    "audio": "base64_encoded_audio",
    "context": "Customer service scenario"
  }'`,
      features: ['Real-time conversation', 'Context awareness', 'Multi-turn dialogue']
    }
  ];

  const activeApi = apis.find(api => api.id === activeTab);

  return (
    <section className="section section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Explore more DAxGENAI APIs
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Play around with human-like voice AI or transcribe sample audio files. 
            Explore how our audio understanding models work.
          </p>
        </motion.div>

        {/* API Tabs */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* API Selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Voice AI foundations</h3>
            <p className="text-slate-300 mb-8">
              Our suite of voice AI tools is designed to transform how you interact with voice data, 
              offering powerful APIs and models to unlock deeper insights and build seamless voice experiences.
            </p>
            
            <div className="space-y-4">
              {apis.map((api) => {
                const Icon = api.icon;
                return (
                  <motion.button
                    key={api.id}
                    onClick={() => setActiveTab(api.id)}
                    className={`w-full p-6 rounded-lg border transition-all duration-300 text-left ${
                      activeTab === api.id
                        ? 'border-sky-400 bg-slate-800/50'
                        : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${
                        activeTab === api.id ? 'bg-sky-400/20' : 'bg-slate-700'
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          activeTab === api.id ? 'text-sky-400' : 'text-slate-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold mb-2 ${
                          activeTab === api.id ? 'text-sky-400' : 'text-slate-200'
                        }`}>
                          {api.name}
                        </h4>
                        <p className="text-sm text-slate-400">
                          {api.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Code Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">API Example</h3>
              <button className="btn-outline text-sm px-4 py-2">
                <Play className="h-4 w-4 mr-2" />
                Try it
              </button>
            </div>
            
            <div className="api-showcase">
              <pre className="text-slate-300 overflow-x-auto">
                <code>{activeApi?.code}</code>
              </pre>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {activeApi?.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 rounded-lg bg-slate-800/50 border border-slate-700"
                >
                  <div className="text-gradient-secondary font-semibold mb-2">
                    {feature}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">30%</div>
              <div className="stat-label">more accurate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3-5x</div>
              <div className="stat-label">cheaper</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">40x</div>
              <div className="stat-label">faster</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">200K+</div>
              <div className="stat-label">developers</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApiShowcase;
