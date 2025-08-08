import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Data Analyst at TechCorp",
      rating: 5,
      text: "The personalized training approach helped me transition from marketing to data analysis in just 6 months. The one-on-one sessions were incredibly valuable.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
      videoUrl: "https://www.youtube.com/embed/example1",
      hasVideo: true
    },
    {
      name: "Michael Chen",
      role: "Business Intelligence Developer",
      rating: 5,
      text: "Outstanding training quality! The Power BI and SQL modules were exactly what I needed to advance my career. Highly recommend the personalized approach.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Emily Rodriguez",
      role: "Machine Learning Engineer",
      rating: 5,
      text: "The Python and Machine Learning courses were comprehensive and practical. The trainer's industry experience really shows in the quality of instruction.",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "David Thompson",
      role: "Senior Data Scientist",
      rating: 5,
      text: "Excellent training program! The generative AI module was cutting-edge and immediately applicable to my work. Great investment in my professional development.",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Lisa Park",
      role: "Analytics Manager",
      rating: 5,
      text: "The flexible scheduling and personalized attention made all the difference. I was able to learn at my own pace while maintaining my full-time job.",
      image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "James Wilson",
      role: "Business Analyst",
      rating: 5,
      text: "Transformed my career completely! The comprehensive curriculum and hands-on projects prepared me for real-world challenges in data analysis.",
      image: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Student Success Stories</h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            Hear from our successful graduates who have transformed their careers through our personalized training programs.
          </p>
        </div>

        {/* Interactive Carousel */}
        <div className="relative">
          {/* Navigation Controls */}
          <div className="flex items-center justify-center mb-8 space-x-4">
            <motion.button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-5 w-5 text-slate-300" />
            </motion.button>
            
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isAutoPlaying ? (
                <Pause className="h-5 w-5 text-slate-300" />
              ) : (
                <Play className="h-5 w-5 text-slate-300" />
              )}
            </motion.button>
            
            <motion.button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-5 w-5 text-slate-300" />
            </motion.button>
          </div>

          {/* Testimonial Display */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="card hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-sky-400 opacity-50" />
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>

                <div className="flex items-center">
                  <motion.img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 sm:mr-4 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-200">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm text-slate-400">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-sky-400' : 'bg-slate-600'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid (Hidden on mobile) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="card hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-sky-400 opacity-50" />
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">"{testimonial.text}"</p>

              <div className="flex items-center">
                <motion.img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 sm:mr-4 flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-200">{testimonial.name}</h4>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="card bg-gradient-primary text-white py-8 sm:py-12 px-6 sm:px-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Join 2000+ Successful Students</h3>
            <p className="text-sm sm:text-base text-slate-200 mb-6 max-w-2xl mx-auto">
              Start your transformation today with personalized one-on-one training that fits your schedule and learning style.
            </p>
            <button className="btn-secondary bg-white text-sky-600 px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold text-sm sm:text-base">
              Book Your Free Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;