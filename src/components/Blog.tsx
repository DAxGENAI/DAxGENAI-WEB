import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>Latest Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Featured Article
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the latest insights and trends in data analytics and generative AI.
          </p>
        </motion.div>

        {/* Featured Blog Post */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Featured Image */}
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Data Analytics with AI"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Featured Article</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>January 15, 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>15 min read</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                The Importance of Data Analytics with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Gen AI
                </span>{' '}
                for Business Growth
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                Discover how the combination of data analytics and generative AI is revolutionizing business decision-making and driving unprecedented growth in the digital age. Learn about key benefits, real-world applications, and implementation strategies.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Enhanced decision making with AI-powered insights</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Predictive capabilities for market trends</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Automated insights and 24/7 monitoring</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Scalable solutions for business growth</span>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/blog"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  to="/#courses"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 font-semibold text-center"
                >
                  Explore Our Courses
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Blog Posts Preview */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">More Articles</h3>
            <p className="text-gray-600">Explore our collection of insights and tutorials</p>
          </div>

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
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">{article.category}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Read More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Articles Button */}
          <div className="text-center mt-8">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-semibold"
            >
              <span>View All Articles</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;