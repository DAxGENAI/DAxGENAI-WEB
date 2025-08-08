import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Award, TrendingUp, Play, Star, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const testimonials = [
    "Just landed my dream job as a Data Analyst! The personalized training was incredible.",
    "From complete beginner to confident analyst in just 3 months. Highly recommend!",
    "The one-on-one approach made all the difference. Worth every penny invested."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-16 pb-20 hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  Master
                </motion.span>
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                  Data Analytics &
                </motion.span>
                <motion.span 
                  className="block text-gradient text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                  Generative AI
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl text-slate-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              >
                Transform your career with personalized one-on-one training from a Senior Data Analyst 
                with 5 years of experience and over 2000 successful students.
              </motion.p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            >
              <motion.button 
                className="btn-primary px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center space-x-2 font-semibold text-base sm:text-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Start Your Journey</span>
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                className="btn-outline px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Courses
              </motion.button>
            </motion.div>

            {/* Dynamic Testimonial Banner */}
            <motion.div 
              className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            >
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-400 to-purple-500 border-2 border-white"
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentTestimonial}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-sm text-slate-200 italic"
                    >
                      "{testimonials[currentTestimonial]}"
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="flex space-x-1">
                  {testimonials.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentTestimonial ? 'bg-sky-400' : 'bg-white/30'
                      }`}
                      animate={{
                        scale: index === currentTestimonial ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            >
              {/* Floating Achievement Badges */}
              <motion.div
                className="absolute top-20 right-20 hidden lg:block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-xs text-slate-200">Top Rated Trainer</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute bottom-20 left-20 hidden lg:block"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-xs text-slate-200">Certified Expert</span>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg mb-2 sm:mb-3 mx-auto"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
                <motion.div 
                  className="text-xl sm:text-2xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4, type: "spring", stiffness: 200 }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    2000+
                  </motion.span>
                </motion.div>
                <div className="text-blue-200 text-xs sm:text-sm">Students Trained</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg mb-2 sm:mb-3 mx-auto"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
                <motion.div 
                  className="text-xl sm:text-2xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.6, type: "spring", stiffness: 200 }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    5 Years
                  </motion.span>
                </motion.div>
                <div className="text-blue-200 text-xs sm:text-sm">Experience</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg mb-2 sm:mb-3 mx-auto"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
                <motion.div 
                  className="text-xl sm:text-2xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.8, type: "spring", stiffness: 200 }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0 }}
                  >
                    98%
                  </motion.span>
                </motion.div>
                <div className="text-blue-200 text-xs sm:text-sm">Success Rate</div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative order-first lg:order-last"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div 
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative group">
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Data Analysis Training"
                  className="rounded-2xl shadow-2xl w-full h-64 sm:h-80 lg:h-auto object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.button
                    className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    <Play className="h-8 w-8 text-white ml-1" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl opacity-20"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.div 
              className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl opacity-20"
              animate={{
                rotate: [0, -360],
                scale: [1, 0.9, 1],
              }}
              transition={{
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;