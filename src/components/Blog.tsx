import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-sky-900 text-sky-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>Latest Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-6">
            Featured Article
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
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
          <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-600">
            {/* Featured Image */}
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Data Analytics with AI"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <span className="bg-sky-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>January 15, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>5 min read</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
                The Future of Data Analytics: How AI is Revolutionizing Business Intelligence
              </h3>

              <p className="text-slate-300 leading-relaxed mb-6">
                Explore how artificial intelligence is transforming the way businesses analyze data, 
                make decisions, and gain competitive advantages in today's rapidly evolving digital landscape.
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">Data Analytics Expert</p>
                    <p className="text-xs text-slate-400">DAxGENAI Team</p>
                  </div>
                </div>

                <Link 
                  to="/blog"
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-slate-300 mb-6">
            Stay updated with the latest trends and insights in data analytics and AI.
          </p>
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore All Articles
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;