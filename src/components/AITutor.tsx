import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2, 
  X, 
  Mic, 
  MicOff, 
  Paperclip, 
  Smile, 
  Volume2, 
  VolumeX,
  BookOpen,
  TrendingUp,
  Target,
  Zap,
  Star,
  MessageCircle,
  FileText,
  Video,
  Camera,
  Download,
  Share2,
  Settings,
  HelpCircle,
  Lightbulb,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiService } from '../services/aiService';
import { useVoiceRecognition, useAudioRecording } from '../hooks/useVoiceRecognition';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'typing' | 'error' | 'file' | 'quick-action';
  reactions?: string[];
  attachments?: Array<{
    name: string;
    type: string;
    size: string;
    url?: string;
  }>;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

const AITutor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Data Analytics Tutor from DAxGENAI. I'm here to help you with questions about Data Analytics, Generative AI, Python, SQL, Power BI, Machine Learning, and more. What would you like to learn today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [conversationCount, setConversationCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice recognition hook
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported: voiceSupported,
    error: voiceError
  } = useVoiceRecognition({
    onResult: (text) => {
      setInputMessage(text);
      handleSendMessage();
    },
    onError: (error) => {
      console.error('Voice recognition error:', error);
    }
  });

  // Audio recording hook (for future use)
  // const {
  //   isRecording: isAudioRecording,
  //   audioBlob,
  //   startRecording: startAudioRecording,
  //   stopRecording: stopAudioRecording,
  //   resetRecording: resetAudioRecording
  // } = useAudioRecording();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Quick Actions
  const quickActions: QuickAction[] = [
    {
      id: 'courses',
      title: 'View Courses',
      description: 'Explore our 8 training modules',
      icon: <BookOpen className="h-5 w-5" />,
      action: () => handleQuickAction('courses'),
      color: 'bg-blue-500'
    },
    {
      id: 'pricing',
      title: 'Pricing Info',
      description: 'Flexible packages starting at ₹8,217',
      icon: <Target className="h-5 w-5" />,
      action: () => handleQuickAction('pricing'),
      color: 'bg-green-500'
    },
    {
      id: 'demo',
      title: 'Book Demo',
      description: 'Free 30-minute personalized session',
      icon: <Calendar className="h-5 w-5" />,
      action: () => handleQuickAction('demo'),
      color: 'bg-purple-500'
    },
    {
      id: 'success',
      title: 'Success Stories',
      description: '98% success rate, 2000+ graduates',
      icon: <Star className="h-5 w-5" />,
      action: () => handleQuickAction('success'),
      color: 'bg-yellow-500'
    }
  ];

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      courses: "I'd love to tell you about our comprehensive training modules! We offer 8 courses designed for career transformation:\n\n1️⃣ **Introduction to Data Analysis with Generative AI** (4 weeks)\n2️⃣ **Advanced Excel** (3 weeks)\n3️⃣ **SQL & Databases** (5 weeks)\n4️⃣ **Microsoft Power BI** (4 weeks)\n5️⃣ **Python Programming** (6 weeks)\n6️⃣ **Statistics** (4 weeks)\n7️⃣ **Machine Learning** (8 weeks)\n8️⃣ **Generative AI & Tools** (3 weeks)\n\nEach course includes personalized one-on-one sessions, hands-on projects, and career guidance. Which module interests you most?",
      pricing: "We offer flexible pricing options designed for different learning needs:\n\n💎 **Single Session** - ₹8,217\n• 1-hour personalized session\n• Perfect for trying our approach\n\n⭐ **Course Package** - ₹24,817 per course (Most Popular)\n• 4-8 weeks of comprehensive training\n• Weekly 1-on-1 sessions\n• Certificate of completion\n\n🚀 **Complete Program** - ₹165,917\n• All 8 modules over 6 months\n• Bi-weekly sessions\n• Portfolio development\n• Job interview preparation\n\n🎉 **Special Offer**: 20% discount for bookings within 7 days!",
      demo: "Great choice! Let's get you scheduled for a free demo session.\n\n🎯 **What's Included**:\n• 30-minute personalized demo\n• Career goal assessment\n• Custom learning roadmap creation\n• No commitment required\n\n⏰ **Available Times**:\n• Evenings (6 PM - 9 PM EST)\n• Weekends (9 AM - 6 PM EST)\n• Custom times available\n\n📅 **Next Steps**:\n1. Choose your preferred time\n2. Receive Google Meet link\n3. Discuss your background and goals\n4. Create personalized learning plan\n\nWould you like me to help you pick a time that works for you?",
      success: "We're incredibly proud of our amazing success stories!\n\n🌟 **Recent Transformations**:\n\n**Sarah J.** (Marketing → Data Analyst)\n• 6-month transition\n• 45% salary increase\n• Now at TechCorp\n\n**Michael C.** (Finance → BI Developer)\n• 4-month program\n• 60% salary increase\n• Senior role at Fortune 500\n\n**Emily R.** (Recent Graduate → ML Engineer)\n• 8-month complete program\n• ₹95L starting salary\n• AI startup position\n\n📊 **Program Statistics**:\n• 98% career transition success rate\n• Average 40% salary increase\n• 85% job placement within 3 months\n• 2000+ successful graduates\n\nThe personalized approach and ongoing mentorship make the difference in their success. Would you like to join their ranks?"
    };

    const aiMessage: Message = {
      id: Date.now().toString(),
      text: actionMessages[action as keyof typeof actionMessages] || "I'd be happy to help you with that!",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, aiMessage]);
    setShowQuickActions(false);
  };

  // Enhanced AI response generation with context awareness
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Update conversation history for context
    setConversationHistory(prev => [...prev, userMessage]);
    
    // Check for repeated questions
    const isRepeatedQuestion = conversationHistory.some(prev => 
      prev.toLowerCase().includes(lowerMessage) || lowerMessage.includes(prev.toLowerCase())
    );
    
    if (isRepeatedQuestion && conversationHistory.length > 2) {
      return "I notice you've asked about this before. Let me provide more specific information. Would you like me to elaborate on any particular aspect or help you with a different topic?";
    }
    
    // Enhanced greeting responses with personalization
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      const greetings = [
        "Hello! I'm your personal AI tutor for DAxGENAI training programs. I'm here to help you understand our courses and how they can transform your career in Data Analytics and AI. What specific course or topic would you like to know more about?",
        "Hi there! Welcome to DAxGENAI. I'm excited to help you explore our personalized training programs. Whether you're a beginner or looking to advance your skills, I can guide you through our comprehensive curriculum. What interests you most?",
        "Hey! Great to see you here. I'm your AI tutor ready to help you navigate our Data Analytics and AI training programs. What would you like to learn about today?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // About trainer/courses with more detail
    if (lowerMessage.includes('trainer') || lowerMessage.includes('instructor') || lowerMessage.includes('teacher')) {
      return "Our trainer is a Senior Data Analyst at NeuNex AI & Analytics with over 5 years of industry experience. They've successfully trained more than 2000 students through personalized one-on-one sessions. The training approach focuses on practical, hands-on learning with real-world projects and immediate feedback. Our trainer specializes in Python, SQL, Power BI, and Machine Learning, with particular expertise in integrating Generative AI tools into data workflows.";
    }
    
    // Course overview with detailed breakdown
    if (lowerMessage.includes('courses') || lowerMessage.includes('modules') || lowerMessage.includes('training programs')) {
      return "We offer 8 comprehensive training modules designed for career transformation:\n\n1️⃣ **Introduction to Data Analysis with Generative AI** (4 weeks) - Perfect for beginners\n2️⃣ **Advanced Excel** (3 weeks) - Master pivot tables and automation\n3️⃣ **SQL & Databases** (5 weeks) - From basics to advanced queries\n4️⃣ **Microsoft Power BI** (4 weeks) - Create stunning dashboards\n5️⃣ **Python Programming** (6 weeks) - Data science with pandas, numpy\n6️⃣ **Statistics** (4 weeks) - Mathematical foundation for analysis\n7️⃣ **Machine Learning** (8 weeks) - Practical ML applications\n8️⃣ **Generative AI & Tools** (3 weeks) - ChatGPT, Claude integration\n\nEach course includes personalized one-on-one sessions, hands-on projects, and career guidance. Which module interests you most?";
    }
    
    // Enhanced Data Analytics responses
    if (lowerMessage.includes('data analytics') || lowerMessage.includes('data analysis')) {
      return "Our Data Analytics training covers the complete workflow from data collection to insights generation. You'll learn:\n\n📊 **Data Collection & Cleaning** - Best practices for data quality\n📈 **Statistical Analysis** - Descriptive and inferential statistics\n🎯 **Data Visualization** - Creating compelling charts and dashboards\n🤖 **AI Integration** - Using AI tools to enhance analysis\n📋 **Reporting** - Professional report creation and presentation\n\nWe use real-world datasets and case studies to ensure practical learning. The course is perfect for career changers and professionals looking to upskill. Would you like to know about our success stories or see a sample project?";
    }
    
    // Enhanced Python responses
    if (lowerMessage.includes('python')) {
      return "Our Python Programming course is specifically designed for data analytics applications. Here's what you'll master:\n\n🐍 **Python Fundamentals** - Variables, loops, functions, OOP\n📊 **Pandas** - Data manipulation and analysis\n🔢 **NumPy** - Numerical computing and arrays\n📈 **Matplotlib & Seaborn** - Data visualization\n🔍 **Data Cleaning** - Handling missing data, outliers\n📋 **Jupyter Notebooks** - Professional development environment\n\nWe focus on practical applications with real datasets. You'll build projects like customer segmentation analysis, sales forecasting, and automated reporting systems. The course includes code review sessions and best practices for professional Python development.";
    }
    
    // Enhanced SQL responses
    if (lowerMessage.includes('sql')) {
      return "Our SQL & Databases course teaches you to efficiently query and manage data. Curriculum includes:\n\n🗄️ **Database Fundamentals** - Understanding data structures\n📝 **Basic Queries** - SELECT, WHERE, ORDER BY, GROUP BY\n🔗 **Joins** - INNER, LEFT, RIGHT, FULL joins\n📊 **Aggregations** - SUM, COUNT, AVG, window functions\n🔍 **Advanced Queries** - Subqueries, CTEs, stored procedures\n⚡ **Performance Optimization** - Indexing and query tuning\n\nWe work with real databases including MySQL, PostgreSQL, and SQL Server. You'll practice with business scenarios like customer analysis, inventory management, and financial reporting. The course prepares you for real-world data challenges.";
    }
    
    // Enhanced Power BI responses
    if (lowerMessage.includes('power bi') || lowerMessage.includes('powerbi')) {
      return "Our Microsoft Power BI course transforms you into a dashboard expert. You'll learn:\n\n📊 **Data Modeling** - Creating relationships and hierarchies\n🔧 **Power Query** - Data transformation and cleaning\n📈 **DAX Formulas** - Calculated columns and measures\n🎨 **Visualization Design** - Charts, maps, custom visuals\n📱 **Dashboard Creation** - Interactive reports and storytelling\n🔄 **Data Refresh** - Automated data updates and scheduling\n\nWe focus on creating business-ready dashboards that tell compelling data stories. You'll build projects like sales dashboards, KPI tracking systems, and executive reports. The course includes best practices for dashboard design and user experience.";
    }
    
    // Enhanced Machine Learning responses
    if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
      return "Our Machine Learning course covers practical ML applications for business problems. You'll learn:\n\n🤖 **ML Fundamentals** - Types of learning, algorithms overview\n📊 **Supervised Learning** - Regression, classification models\n🔍 **Unsupervised Learning** - Clustering, dimensionality reduction\n📈 **Model Evaluation** - Accuracy metrics, cross-validation\n🛠️ **Implementation** - Using scikit-learn, TensorFlow\n📋 **ML Pipeline** - From data prep to model deployment\n\nWe focus on business applications like customer segmentation, demand forecasting, and fraud detection. You'll work with real datasets and learn to interpret model results for business decisions. The course includes model deployment strategies and ethical AI considerations.";
    }
    
    // Enhanced Generative AI responses
    if (lowerMessage.includes('generative ai') || lowerMessage.includes('chatgpt') || lowerMessage.includes('ai tools')) {
      return "Our Generative AI & Tools course teaches you to leverage AI for enhanced productivity. You'll master:\n\n🤖 **ChatGPT & Claude** - Prompt engineering and best practices\n📝 **Code Generation** - AI-assisted programming for data analysis\n📊 **Data Interpretation** - Using AI to explain complex results\n📋 **Report Automation** - AI-powered documentation and reporting\n🔧 **Integration** - Combining AI tools with traditional analytics\n⚡ **Productivity Hacks** - Workflow optimization with AI\n\nWe focus on practical applications like automated data cleaning, AI-powered insights generation, and intelligent report creation. You'll learn to use AI as a collaborative tool to enhance your analytical capabilities, not replace them.";
    }
    
    // Enhanced Excel course
    if (lowerMessage.includes('excel')) {
      return "Our Advanced Excel course goes beyond basic spreadsheets. You'll master:\n\n📊 **Pivot Tables** - Dynamic data analysis and reporting\n🔧 **Advanced Formulas** - VLOOKUP, INDEX/MATCH, array formulas\n⚡ **Macros & VBA** - Automation and custom functions\n📈 **Data Analysis Tools** - Goal seek, solver, scenario manager\n🎨 **Advanced Charts** - Custom visualizations and dashboards\n📋 **Power Query** - Data transformation and cleaning\n\nWe focus on business applications like financial modeling, sales analysis, and operational reporting. You'll build practical projects that demonstrate real-world Excel capabilities. The course includes best practices for spreadsheet design and data integrity.";
    }
    
    // Enhanced Statistics course
    if (lowerMessage.includes('statistics') || lowerMessage.includes('stats')) {
      return "Our Statistics course provides the mathematical foundation for data analysis. You'll learn:\n\n📊 **Descriptive Statistics** - Mean, median, standard deviation\n📈 **Probability Distributions** - Normal, binomial, Poisson\n🔍 **Hypothesis Testing** - T-tests, chi-square, ANOVA\n📋 **Regression Analysis** - Linear and multiple regression\n🎯 **Statistical Modeling** - Predictive analytics foundations\n📊 **Statistical Software** - Using tools for analysis\n\nWe focus on practical applications with real data. You'll learn to interpret statistical results and communicate findings effectively. The course prepares you for advanced analytics and machine learning by building strong statistical foundations.";
    }
    
    // Enhanced pricing and packages
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('package')) {
      return "We offer flexible pricing options designed for different learning needs:\n\n💎 **Single Session** - ₹8,217\n• 1-hour personalized session\n• Perfect for trying our approach\n• Course material access included\n\n⭐ **Course Package** - ₹24,817 per course (Most Popular)\n• 4-8 weeks of comprehensive training\n• Weekly 1-on-1 sessions\n• All materials and projects included\n• Certificate of completion\n\n🚀 **Complete Program** - ₹165,917\n• All 8 modules over 6 months\n• Bi-weekly sessions\n• Portfolio development\n• Job interview preparation\n• 6 months mentorship\n\n🎉 **Special Offer**: 20% discount for bookings within 7 days!\n\nAll packages include personalized attention and comprehensive support. Which option best fits your goals?";
    }
    
    // Enhanced scheduling and booking
    if (lowerMessage.includes('schedule') || lowerMessage.includes('book') || lowerMessage.includes('demo') || lowerMessage.includes('session')) {
      return "Booking is very flexible and designed around your schedule!\n\n⏰ **Available Times**:\n• Evenings (6 PM - 9 PM EST)\n• Weekends (9 AM - 6 PM EST)\n• Custom times available\n\n🎯 **Free Demo Session**:\n• 30-minute personalized demo\n• Career goal assessment\n• Custom learning roadmap creation\n• No commitment required\n\n📅 **Booking Process**:\n1. Schedule free demo via Google Meet\n2. Discuss your background and goals\n3. Create personalized learning plan\n4. Choose your preferred package\n5. Start your transformation journey\n\nWould you like me to help you schedule your free demo session?";
    }
    
    // Enhanced one-on-one approach
    if (lowerMessage.includes('one-on-one') || lowerMessage.includes('personal') || lowerMessage.includes('individual')) {
      return "Our one-on-one approach is what truly sets us apart from traditional courses!\n\n🎯 **Personalized Learning**:\n• Customized curriculum based on your background\n• Pace adjusted to your learning style\n• Focus on your specific career goals\n\n👨‍🏫 **Direct Expert Access**:\n• Direct access to Senior Data Analyst\n• Immediate feedback and clarification\n• Real-time problem solving\n\n📈 **Proven Results**:\n• 98% success rate\n• 2000+ successful students\n• Average 40% salary increase\n\n🔄 **Continuous Support**:\n• Ongoing mentorship beyond course completion\n• Career guidance and networking\n• Portfolio and resume review\n\nUnlike pre-recorded courses, you get real-time interaction and personalized attention that accelerates your learning and career growth.";
    }
    
    // Enhanced career advice
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('salary')) {
      return "Our training programs are specifically designed for career transformation!\n\n📈 **Career Outcomes**:\n• Data Analyst: ₹54L - ₹79L average salary\n• Business Intelligence Developer: ₹62L - ₹91L\n• Machine Learning Engineer: ₹75L - ₹108L\n• Data Scientist: ₹71L - ₹100L\n\n🎯 **Career Services Included**:\n• Resume optimization for data roles\n• LinkedIn profile enhancement\n• Mock interview preparation\n• Job search strategy guidance\n• Industry networking introductions\n\n📊 **Success Stories**:\n• **Sarah J.** (Marketing → Data Analyst)\n• 6-month transformation\n• ₹21L salary increase\n• Tech company position\n\n• **Michael C.** (Sales → ML Engineer)\n• 8-month complete program\n• ₹79L starting salary\n• AI startup position\n\n**David T.** (Operations → Data Scientist)\n• 6-month transformation\n• 70% salary increase\n• Lead role in analytics team\n\n📊 **Program Statistics**:";
    }
    
    // Enhanced getting started
    if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('learn')) {
      return "Perfect! Let's get you started on your data analytics journey.\n\n🚀 **Recommended Starting Path**:\n\n**For Complete Beginners**:\n1. Introduction to Data Analysis with Generative AI\n2. Advanced Excel\n3. SQL & Databases\n4. Python Programming\n5. Power BI\n6. Statistics\n7. Machine Learning\n8. Generative AI & Tools\n\n**For Professionals with Some Experience**:\n1. Python Programming (if needed)\n2. SQL & Databases\n3. Power BI\n4. Machine Learning\n5. Generative AI & Tools\n\n🎯 **Next Steps**:\n1. Book your free 30-minute demo session\n2. Complete a skills assessment\n3. Receive your personalized learning roadmap\n4. Choose your preferred package\n5. Begin your transformation journey\n\nWould you like to schedule your free demo to create your personalized learning plan?";
    }
    
    // Enhanced success stories
    if (lowerMessage.includes('success') || lowerMessage.includes('testimonial') || lowerMessage.includes('graduate')) {
      return "We're incredibly proud of our 98% success rate and the amazing transformations our students have achieved!\n\n🌟 **Recent Success Stories**:\n\n**Sarah J.** (Marketing → Data Analyst)\n• 6-month transition\n• 45% salary increase\n• Now at TechCorp\n\n**Michael C.** (Finance → BI Developer)\n• 4-month program\n• 60% salary increase\n• Senior role at Fortune 500\n\n**Emily R.** (Recent Graduate → ML Engineer)\n• 8-month complete program\n• ₹95L starting salary\n• AI startup position\n\n**David T.** (Operations → Data Scientist)\n• 6-month transformation\n• 70% salary increase\n• Lead role in analytics team\n\n📊 **Program Statistics**:\n• 98% career transition success rate\n• Average 40% salary increase\n• 85% job placement within 3 months\n• 2000+ successful graduates\n\nThe personalized approach and ongoing mentorship make the difference in their success. Would you like to join their ranks?";
    }
    
    // Enhanced duration and time commitment
    if (lowerMessage.includes('duration') || lowerMessage.includes('time') || lowerMessage.includes('long') || lowerMessage.includes('weeks')) {
      return "We offer flexible durations to fit your schedule and learning pace!\n\n⏰ **Course Durations**:\n\n**Individual Courses**:\n• Excel: 3 weeks\n• Power BI: 4 weeks\n• SQL: 5 weeks\n• Python: 6 weeks\n• Statistics: 4 weeks\n• Machine Learning: 8 weeks\n• Generative AI: 3 weeks\n\n**Complete Program**: 6 months\n• Bi-weekly sessions\n• Comprehensive coverage\n• Portfolio development\n• Career preparation\n\n📅 **Time Commitment**:\n• Sessions: 1-2 hours per week\n• Practice: 3-5 hours per week\n• Projects: 2-4 hours per week\n• Total: 6-11 hours per week\n\n🔄 **Flexible Scheduling**:\n• Evening sessions available\n• Weekend options\n• Custom timing possible\n• Self-paced components\n\nWe can adjust the pace based on your availability and learning speed. Most students find the time investment manageable while working full-time.";
    }
    
    // Enhanced default responses with more variety
    const defaultResponses = [
      "I'd love to help you learn more about our DAxGENAI training programs! I can provide details about our 8 course modules, pricing packages, scheduling flexibility, or our personalized one-on-one approach. What specific aspect interests you most?",
      "That's a great question! I can help you understand our courses (Python, SQL, Power BI, Machine Learning, etc.), our trainer's experience, pricing options, or how to get started with a free demo. What would you like to know more about?",
      "I'm here to help you discover how DAxGENAI can transform your career! Whether you're interested in specific courses, our teaching approach, success stories, or booking a demo session, I'm ready to provide personalized guidance. What can I tell you about?",
      "Excellent question! I can guide you through our comprehensive training programs, share success stories from our 2000+ graduates, explain our pricing options, or help you schedule a free demo. What would be most helpful for you right now?",
      "I'm excited to help you explore our Data Analytics and AI training programs! I can provide information about course content, our personalized teaching approach, career outcomes, or help you get started. What aspect would you like to explore first?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationCount(prev => prev + 1);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Use AI service for response
      const aiResponseText = await aiService.generateResponse(currentInput, conversationHistory.join('\n'));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiResponse]);
      
      // Text-to-speech if enabled
      if (voiceEnabled) {
        await speakText(aiResponseText);
      }
      
    } catch (error) {
      console.error('AI response error:', error);
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(currentInput),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, fallbackResponse]);
    }
    
    setIsTyping(false);
  };

  const speakText = async (text: string) => {
    if (!voiceEnabled) return;
    
    setIsSpeaking(true);
    try {
      await aiService.synthesizeSpeech(text);
    } catch (error) {
      console.error('Speech synthesis error:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    if (!voiceSupported) {
      alert('Voice recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      stopListening();
      resetTranscript();
    } else {
      startListening();
    }
  };

  const handleVoiceToggle = () => {
    setVoiceEnabled(!voiceEnabled);
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Handle file upload logic here
      const fileMessage: Message = {
        id: Date.now().toString(),
        text: `Uploaded: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'file',
        attachments: [{
          name: file.name,
          type: file.type,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
        }]
      };
      setMessages(prev => [...prev, fileMessage]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
      // Handle file upload logic here
    }
  };

  const addReaction = (messageId: string, reaction: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
        : msg
    ));
  };

  if (!isOpen) {
    return (
      <motion.div 
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group relative"
        >
          <Bot className="h-6 w-6" />
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <motion.div 
            className="absolute -top-12 right-0 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
          >
            Ask AI Tutor
          </motion.div>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ zIndex: 50 }}
    >
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-80 sm:w-96 h-96 sm:h-[500px]'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              animate={{ rotate: isTyping ? 360 : 0 }}
              transition={{ duration: 2, repeat: isTyping ? Infinity : 0 }}
            >
              <Bot className="h-5 w-5" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">AI Data Analytics Tutor</h3>
              <p className="text-xs text-blue-100 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Online • Ready to help
                {conversationCount > 0 && (
                  <span className="ml-2 text-blue-200">• {conversationCount} messages</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Quick Actions */}
            <AnimatePresence>
              {showQuickActions && (
                <motion.div 
                  className="p-4 border-b border-gray-100"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-gray-600 mb-3">Quick Actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <motion.button
                        key={action.id}
                        onClick={action.action}
                        className={`${action.color} text-white p-3 rounded-lg text-left transition-all duration-200 hover:scale-105`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex items-center gap-2">
                          {action.icon}
                          <div>
                            <p className="font-semibold text-xs">{action.title}</p>
                            <p className="text-xs opacity-90">{action.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div 
              className={`overflow-y-auto p-4 space-y-4 ${
                showQuickActions ? 'h-48 sm:h-64' : 'h-64 sm:h-80'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {message.sender === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                    </div>
                    <div className={`p-3 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}>
                      {message.type === 'file' && message.attachments && (
                        <div className="mb-2 p-2 bg-white/10 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-xs">{message.attachments[0].name}</span>
                          </div>
                        </div>
                      )}
                      <p className="leading-relaxed whitespace-pre-line">{message.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className={`text-xs ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {message.sender === 'ai' && (
                          <div className="flex gap-1">
                            {['👍', '❤️', '😊', '🎯'].map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => addReaction(message.id, emoji)}
                                className="text-xs hover:scale-110 transition-transform"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {message.reactions.map((reaction, index) => (
                            <span key={index} className="text-xs">{reaction}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <Bot className="h-3 w-3 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  title={isListening ? 'Stop listening' : 'Start voice input'}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
                <button
                  onClick={handleVoiceToggle}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    voiceEnabled ? 'text-green-600 hover:bg-green-50' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  title={voiceEnabled ? 'Disable text-to-speech' : 'Enable text-to-speech'}
                >
                  {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  title="Attach file"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.jpg,.png"
                />
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? "Listening..." : "Ask about data analytics, AI, Python, SQL..."}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  disabled={isTyping || isListening}
                />
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <Smile className="h-4 w-4" />
                </button>
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping || isListening}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
              {isListening && (
                <motion.div 
                  className="mt-2 text-xs text-blue-600 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  🎤 Listening... Speak now
                </motion.div>
              )}
              {isSpeaking && (
                <motion.div 
                  className="mt-2 text-xs text-green-600 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  🔊 Speaking...
                </motion.div>
              )}
              {voiceError && (
                <motion.div 
                  className="mt-2 text-xs text-red-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ❌ {voiceError}
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AITutor;