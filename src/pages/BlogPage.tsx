import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight, 
  BarChart3, 
  Brain, 
  Target, 
  Zap, 
  Shield, 
  Globe, 
  Lightbulb,
  ArrowLeft,
  Share2,
  BookOpen,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">DAxGENAI Blog</span>
              <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <main className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="h-4 w-4" />
              <span>Featured Article</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The Importance of Data Analytics with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Gen AI
              </span>{' '}
              for Business Growth
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover how the combination of data analytics and generative AI is revolutionizing business decision-making and driving unprecedented growth in the digital age.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>January 15, 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>15 min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>By DAxGENAI Team</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden mb-12 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Data Analytics with AI"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </motion.div>

          {/* Article Content */}
          <motion.article 
            className="prose prose-lg sm:prose-xl max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Introduction */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Lightbulb className="h-8 w-8 text-blue-600" />
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                In today's rapidly evolving business landscape, organizations are generating unprecedented amounts of data. However, the true value lies not in the data itself, but in the insights that can be extracted from it. This is where the powerful combination of data analytics and generative AI (Gen AI) comes into play, creating a paradigm shift in how businesses make decisions and drive growth.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The integration of traditional data analytics with cutting-edge generative AI technologies is not just a trend—it's becoming a fundamental requirement for businesses that want to stay competitive and thrive in the digital economy.
              </p>
            </div>

            {/* Key Benefits Section */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 mb-8 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
                <Zap className="h-8 w-8" />
                Key Benefits of Data Analytics with Gen AI
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Enhanced Decision Making</h3>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        Gen AI can analyze complex datasets and provide actionable insights in natural language, making data-driven decisions accessible to all stakeholders.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Predictive Capabilities</h3>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        Advanced forecasting models powered by Gen AI can predict market trends, customer behavior, and business outcomes with remarkable accuracy.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Brain className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Automated Insights</h3>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        Gen AI can automatically identify patterns, anomalies, and opportunities that human analysts might miss, providing 24/7 intelligent monitoring.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Scalable Solutions</h3>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        Cloud-based Gen AI solutions can scale with your business, handling increasing data volumes without proportional increases in resources.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Applications */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Real-World Business Applications</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Experience Optimization</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Gen AI can analyze customer interactions across multiple channels, providing personalized recommendations and improving customer satisfaction scores by up to 40%.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-800 font-medium">💡 Example: E-commerce platforms using Gen AI to create personalized product recommendations based on browsing patterns and purchase history.</p>
                  </div>
                </div>

                <div className="border-l-4 border-green-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Operational Efficiency</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    By automating routine data analysis tasks, Gen AI can reduce manual processing time by 60-80%, allowing teams to focus on strategic initiatives.
                  </p>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-800 font-medium">💡 Example: Manufacturing companies using Gen AI to predict equipment failures and optimize maintenance schedules.</p>
                  </div>
                </div>

                <div className="border-l-4 border-purple-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Market Intelligence</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Gen AI can process vast amounts of market data, social media sentiment, and competitor information to provide real-time market insights.
                  </p>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-purple-800 font-medium">💡 Example: Financial institutions using Gen AI to analyze market trends and make informed investment decisions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Strategy */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 mb-8 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Implementation Strategy</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-300">Phase 1: Foundation</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Assess current data infrastructure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Identify key business objectives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Select appropriate Gen AI tools</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-300">Phase 2: Integration</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Pilot programs with specific use cases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Train teams on new technologies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Establish governance frameworks</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Challenges and Solutions */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Challenges and Solutions</h2>
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Challenge: Data Quality and Privacy</h3>
                  <p className="text-red-700 mb-3">Ensuring data accuracy and maintaining privacy compliance while leveraging Gen AI capabilities.</p>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-700"><strong>Solution:</strong> Implement robust data governance policies, use anonymization techniques, and ensure compliance with regulations like GDPR and CCPA.</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">Challenge: Skill Gap</h3>
                  <p className="text-yellow-700 mb-3">Finding and retaining talent with expertise in both data analytics and Gen AI technologies.</p>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-700"><strong>Solution:</strong> Invest in training programs, partner with educational institutions, and consider managed services for specialized expertise.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Start your journey towards data-driven decision making with our comprehensive training programs in Data Analytics and Generative AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/#courses"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
                >
                  <span>Start Learning Today</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  to="/#pricing"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 font-semibold"
                >
                  View Our Courses
                </Link>
              </div>
            </div>
          </motion.article>

          {/* Article Footer */}
          <motion.div 
            className="mt-12 pt-8 border-t border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>Share this article:</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <span className="text-xs font-bold">T</span>
                  </button>
                  <button className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <span className="text-xs font-bold">L</span>
                  </button>
                  <button className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <span className="text-xs font-bold">F</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Last updated: January 15, 2024</span>
              </div>
            </div>
          </motion.div>

          {/* Related Articles Section */}
          <motion.div 
            className="mt-16 pt-8 border-t border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Getting Started with Python for Data Analysis",
                  excerpt: "Learn the fundamentals of Python programming for data science and analytics.",
                  readTime: "8 min read",
                  category: "Python"
                },
                {
                  title: "Power BI vs Tableau: Which Tool is Right for You?",
                  excerpt: "Compare the leading business intelligence tools and find the perfect fit for your needs.",
                  readTime: "12 min read",
                  category: "Business Intelligence"
                },
                {
                  title: "The Future of Machine Learning in Business",
                  excerpt: "Explore how machine learning is transforming industries and creating new opportunities.",
                  readTime: "10 min read",
                  category: "Machine Learning"
                }
              ].map((article, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">{article.category}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                      Read More
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BlogPage; 