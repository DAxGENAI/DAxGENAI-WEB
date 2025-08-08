import React from 'react';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackCourseView } from './Analytics';
import CourseCard3D from './CourseCard3D';

const Courses = () => {
  const courses = [
    {
      title: "Introduction to Data Analysis with Generative AI",
      description: "Start your journey with the fundamentals of data analysis enhanced by AI tools and techniques.",
      duration: "4 weeks",
      level: "Beginner",
      rating: 4.9,
      students: 450,
      logo: "🤖",
      logoName: "AI & Analytics"
    },
    {
      title: "Advanced Excel for Data Analysis",
      description: "Master advanced Excel features, pivot tables, macros, and data visualization techniques.",
      duration: "3 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 380,
      logo: "📊",
      logoName: "Microsoft Excel"
    },
    {
      title: "SQL & Database Management",
      description: "Learn SQL from basics to advanced queries, database design, and optimization techniques.",
      duration: "5 weeks",
      level: "Beginner to Advanced",
      rating: 4.9,
      students: 520,
      logo: "🗄️",
      logoName: "SQL Database"
    },
    {
      title: "Microsoft Power BI",
      description: "Create stunning dashboards and reports with Power BI's advanced visualization capabilities.",
      duration: "4 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 340,
      logo: "📈",
      logoName: "Power BI"
    },
    {
      title: "Python Programming for Data Science",
      description: "Master Python programming with focus on pandas, numpy, matplotlib, and data manipulation.",
      duration: "6 weeks",
      level: "Beginner to Advanced",
      rating: 4.9,
      students: 680,
      logo: "🐍",
      logoName: "Python"
    },
    {
      title: "Statistics for Data Analysis",
      description: "Understand statistical concepts, hypothesis testing, and statistical modeling for data insights.",
      duration: "4 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 290,
      logo: "📊",
      logoName: "Statistics"
    },
    {
      title: "Machine Learning Fundamentals",
      description: "Dive into ML algorithms, model building, evaluation, and practical implementation.",
      duration: "8 weeks",
      level: "Advanced",
      rating: 4.9,
      students: 420,
      logo: "🤖",
      logoName: "Machine Learning"
    },
    {
      title: "Generative AI & Its Tools",
      description: "Explore ChatGPT, Claude, and other AI tools for data analysis and business applications.",
      duration: "3 weeks",
      level: "Intermediate",
      rating: 5.0,
      students: 380,
      logo: "✨",
      logoName: "Generative AI"
    }
  ];

  return (
    <section id="courses" className="section section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Training Modules
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Comprehensive courses designed to take you from beginner to expert in data analysis and AI.
          </motion.p>
        </div>



        {/* Course Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CourseCard3D
                title={course.title}
                description={course.description}
                duration={course.duration}
                level={course.level}
                rating={course.rating}
                students={course.students}
                logo={course.logo}
                logoName={course.logoName}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;