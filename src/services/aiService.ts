import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

// AI Service Configuration
interface AIConfig {
  geminiApiKey?: string;
  openaiApiKey?: string;
  provider: 'gemini' | 'openai' | 'mock';
}

class AIService {
  private config: AIConfig;
  private geminiModel: any;
  private openaiClient: any;

  constructor(config: AIConfig) {
    this.config = config;
    this.initializeAI();
  }

  private initializeAI() {
    if (this.config.provider === 'gemini' && this.config.geminiApiKey) {
      const genAI = new GoogleGenerativeAI(this.config.geminiApiKey);
      this.geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });
    }

    if (this.config.provider === 'openai' && this.config.openaiApiKey) {
      this.openaiClient = new OpenAI({
        apiKey: this.config.openaiApiKey,
        dangerouslyAllowBrowser: true
      });
    }
  }

  async generateResponse(userMessage: string, context?: string): Promise<string> {
    try {
      switch (this.config.provider) {
        case 'gemini':
          return await this.generateGeminiResponse(userMessage, context);
        case 'openai':
          return await this.generateOpenAIResponse(userMessage, context);
        case 'mock':
        default:
          return this.generateMockResponse(userMessage);
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.generateMockResponse(userMessage);
    }
  }

  private async generateGeminiResponse(userMessage: string, context?: string): Promise<string> {
    if (!this.geminiModel) {
      throw new Error('Gemini model not initialized');
    }

    const prompt = this.buildPrompt(userMessage, context);
    const result = await this.geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  private async generateOpenAIResponse(userMessage: string, context?: string): Promise<string> {
    if (!this.openaiClient) {
      throw new Error('OpenAI client not initialized');
    }

    const prompt = this.buildPrompt(userMessage, context);
    const completion = await this.openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert Data Analytics and AI tutor from DAxGENAI. Provide helpful, accurate, and engaging responses about data analytics, programming, and AI topics."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  }

  private buildPrompt(userMessage: string, context?: string): string {
    const basePrompt = `You are an expert Data Analytics and AI tutor from DAxGENAI. You help students understand data analytics, programming, and AI concepts.

Context about DAxGENAI:
- We offer personalized one-on-one training in Data Analytics and AI
- Our trainer has 5+ years of experience and has trained 2000+ students
- We offer 8 comprehensive courses: Python, SQL, Power BI, Machine Learning, etc.
- Our success rate is 98% with average salary increase of $25K
- We provide flexible scheduling and personalized learning plans

${context ? `Previous context: ${context}\n` : ''}

User question: ${userMessage}

Please provide a helpful, accurate, and engaging response that:
1. Answers the user's question clearly
2. Relates to our training programs when relevant
3. Encourages further engagement
4. Maintains a friendly, professional tone
5. Keeps responses concise but informative

Response:`;

    return basePrompt;
  }

  private generateMockResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    // Enhanced mock responses with more variety
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm your AI tutor from DAxGENAI. I'm here to help you with any questions about data analytics, programming, or our training programs. What would you like to learn about today?";
    }
    
    if (lowerMessage.includes('python')) {
      return "Python is a fantastic choice for data analytics! Our Python course covers everything from basics to advanced data manipulation with pandas, numpy, and matplotlib. You'll build real projects and get personalized guidance. Would you like to know more about the curriculum or see some sample projects?";
    }
    
    if (lowerMessage.includes('sql')) {
      return "SQL is essential for data analysis! Our SQL course teaches you from basic queries to advanced database management. You'll work with real databases and learn optimization techniques. The course includes hands-on projects and personalized mentoring. Ready to start your SQL journey?";
    }
    
    if (lowerMessage.includes('machine learning')) {
      return "Machine Learning is transforming industries! Our ML course covers practical applications using Python. You'll learn supervised and unsupervised learning, model evaluation, and real-world implementation. We focus on business applications and career-ready skills. Interested in seeing our ML projects?";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "We offer flexible pricing: Single Session (₹8,217), Course Package (₹24,817), or Complete Program (₹165,917). All include personalized one-on-one training and comprehensive support. We also have a 20% discount for new students! Would you like to schedule a free demo to discuss your goals?";
    }
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('book')) {
      return "Booking is very flexible! We offer sessions during evenings, weekends, or any time that works for you. You can start with a free 30-minute demo to discuss your goals and create a personalized learning plan. No commitment required!";
    }
    
    return "That's a great question! I'd love to help you learn more about our DAxGENAI training programs. We offer comprehensive courses in data analytics, programming, and AI with personalized one-on-one mentoring. What specific aspect interests you most?";
  }

  // Voice-to-text functionality
  async transcribeAudio(audioBlob: Blob): Promise<string> {
    try {
      if (this.config.provider === 'openai' && this.openaiClient) {
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.webm');
        formData.append('model', 'whisper-1');

        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.openaiApiKey}`,
          },
          body: formData,
        });

        const result = await response.json();
        return result.text || '';
      }
      
      // Fallback to mock transcription
      return "Voice transcription not available in demo mode.";
    } catch (error) {
      console.error('Transcription error:', error);
      return "Sorry, I couldn't transcribe your audio.";
    }
  }

  // Text-to-speech functionality
  async synthesizeSpeech(text: string): Promise<Blob | null> {
    try {
      if (this.config.provider === 'openai' && this.openaiClient) {
        const response = await this.openaiClient.audio.speech.create({
          model: "tts-1",
          voice: "alloy",
          input: text,
        });

        return await response.blob();
      }
      
      // Fallback to browser TTS
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
      
      return null;
    } catch (error) {
      console.error('Speech synthesis error:', error);
      return null;
    }
  }

  // Update configuration
  updateConfig(newConfig: Partial<AIConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.initializeAI();
  }
}

// Create default instance
const defaultConfig: AIConfig = {
  provider: 'mock'
};

export const aiService = new AIService(defaultConfig);

// Export for use in components
export default AIService; 