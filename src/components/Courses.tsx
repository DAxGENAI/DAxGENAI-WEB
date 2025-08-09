import React, { useRef, useEffect, useState } from 'react';
import { Clock, Users, Star, ArrowRight, Sparkles, Zap, Target, TrendingUp } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { trackCourseView } from './Analytics';
import CourseCard3D from './CourseCard3D';
import { courseContent } from '../data/courseContent';

const Courses = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  
  // Smooth spring animations
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 });
  const springY4 = useSpring(y4, { stiffness: 100, damping: 30 });

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="courses" className="section section-dark relative overflow-hidden" ref={containerRef}>
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Tech Icons */}
        <motion.div
          className="absolute top-20 left-10 text-4xl opacity-20"
          style={{ y: springY1 }}
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          🤖
        </motion.div>
        
        <motion.div
          className="absolute top-40 right-20 text-3xl opacity-15"
          style={{ y: springY2 }}
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
            rotate: [0, -8, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          📊
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-20 text-3xl opacity-15"
          style={{ y: springY3 }}
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
            rotate: [0, 12, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          🐍
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-10 text-4xl opacity-20"
          style={{ y: springY4 }}
          animate={{
            x: [0, -30, 0],
            y: [0, 10, 0],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          ✨
        </motion.div>

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-sky-500/20 to-blue-600/20 rounded-full blur-xl"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [0, 100]),
            y: useTransform(scrollYProgress, [0, 1], [0, -50]),
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-full blur-xl"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [0, -80]),
            y: useTransform(scrollYProgress, [0, 1], [0, 60]),
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Floating Data Points */}
        <motion.div
          className="absolute top-1/3 right-1/3 flex items-center gap-2 text-sky-400/30"
          style={{ y: springY1 }}
          animate={{
            x: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <TrendingUp className="h-4 w-4" />
          <span className="text-xs font-mono">+127%</span>
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/3 left-1/3 flex items-center gap-2 text-purple-400/30"
          style={{ y: springY2 }}
          animate={{
            x: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Target className="h-4 w-4" />
          <span className="text-xs font-mono">98.5%</span>
        </motion.div>

        {/* Interactive Mouse Follow Elements */}
        <motion.div
          className="absolute w-2 h-2 bg-sky-400 rounded-full pointer-events-none"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [mousePosition.x * 100, mousePosition.x * 200]),
            y: useTransform(scrollYProgress, [0, 1], [mousePosition.y * 100, mousePosition.y * 200]),
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute w-1 h-1 bg-purple-400 rounded-full pointer-events-none"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [mousePosition.x * 150, mousePosition.x * 250]),
            y: useTransform(scrollYProgress, [0, 1], [mousePosition.y * 150, mousePosition.y * 250]),
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Main Content with Parallax */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with Parallax */}
        <motion.div 
          className="text-center mb-10"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-sky-500/10 border border-sky-500/20 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4 text-sky-400" />
            <span className="text-sm font-medium text-sky-300">Interactive Learning</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-slate-100 to-sky-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            1-on-1 Training Programs
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Personalized training modules designed to take you from beginner to expert in data analysis and AI. 
            Each program includes dedicated 1-on-1 sessions with your trainer.
          </motion.p>
        </motion.div>

        {/* Course Grid with Enhanced Parallax */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -20]) }}
        >
          {courseContent.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <CourseCard3D
                title={course.title}
                description={course.description}
                duration={`${course.totalDuration} hours`}
                level={course.difficulty}
                rating={course.rating}
                students={course.students}
                logo={getCourseLogo(course.id)}
                logoName={getCourseLogoName(course.id)}
                price={`₹${course.price.toLocaleString()}`}
                tools={course.tools.slice(0, 3)}
                learningOutcomes={course.learningOutcomes.slice(0, 3)}
                certificate={course.certificate}
                lastUpdated={course.lastUpdated}
                onClick={() => trackCourseView(course.title)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action with Parallax */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -40]) }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-sky-500/10 to-purple-500/10 border border-sky-500/20 rounded-full"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 0 rgba(14, 165, 233, 0.4)",
                "0 0 0 10px rgba(14, 165, 233, 0)",
                "0 0 0 0 rgba(14, 165, 233, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="h-4 w-4 text-sky-400" />
            <span className="text-sm font-medium text-sky-300">Ready to Transform?</span>
          </motion.div>
          
          <p className="text-lg text-slate-300 mb-6">
            Experience the power of personalized learning! Book your free 1-on-1 demo session to see how our training approach works.
          </p>
          <motion.button 
            className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto relative overflow-hidden group"
            onClick={() => {
              trackCourseView('demo_booking');
              // Trigger demo booking modal
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">Book Free 1-on-1 Demo</span>
            <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Helper functions to get course logos and names
const getCourseLogo = (courseId: string): string => {
  const logos: Record<string, string> = {
    'intro-data-analysis-ai': '🤖',
    'advanced-excel': '📊',
    'sql-database': '🗄️',
    'power-bi': '📈',
    'python-data-science': '🐍',
    'statistics': '📊',
    'machine-learning': '🤖',
    'generative-ai-tools': '✨'
  };
  return logos[courseId] || '📚';
};

const getCourseLogoName = (courseId: string): string => {
  const names: Record<string, string> = {
    'intro-data-analysis-ai': 'AI & Analytics',
    'advanced-excel': 'Microsoft Excel',
    'sql-database': 'SQL Database',
    'power-bi': 'Power BI',
    'python-data-science': 'Python Programming',
    'statistics': 'Statistics',
    'machine-learning': 'Machine Learning',
    'generative-ai-tools': 'Generative AI'
  };
  return names[courseId] || 'Course';
};

export default Courses;