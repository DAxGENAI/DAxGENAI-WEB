import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Target, Clock, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface CourseRecommendation {
  title: string;
  description: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  logo: string;
  matchScore: number;
  features: string[];
}

const CourseFinder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);

  const questions: Question[] = [
    {
      id: 'experience',
      text: 'What is your current experience level?',
      options: ['Complete Beginner', 'Some Experience', 'Intermediate', 'Advanced']
    },
    {
      id: 'goal',
      text: 'What is your primary goal?',
      options: ['Career Change', 'Skill Enhancement', 'Job Promotion', 'Personal Interest', 'Business Growth']
    },
    {
      id: 'focus',
      text: 'Which area interests you most?',
      options: ['Data Analysis', 'Machine Learning', 'Business Intelligence', 'Generative AI', 'Statistics', 'Programming']
    },
    {
      id: 'timeframe',
      text: 'How much time can you dedicate weekly?',
      options: ['2-4 hours', '5-8 hours', '10-15 hours', '20+ hours']
    },
    {
      id: 'budget',
      text: 'What is your budget range?',
      options: ['Under ₹8,300', '₹8,300-₹24,900', '₹24,900-₹83,000', '₹83,000+']
    }
  ];

  const allCourses: CourseRecommendation[] = [
    {
      title: "Introduction to Data Analysis with Generative AI",
      description: "Perfect for beginners starting their data journey with AI assistance.",
      duration: "4 weeks",
      level: "Beginner",
      rating: 4.9,
      students: 450,
      logo: "🤖",
      matchScore: 0,
      features: ["AI-powered learning", "Hands-on projects", "Personal mentoring"]
    },
    {
      title: "Advanced Excel for Data Analysis",
      description: "Master Excel for professional data analysis and reporting.",
      duration: "3 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 380,
      logo: "📊",
      matchScore: 0,
      features: ["Advanced formulas", "Pivot tables", "Data visualization"]
    },
    {
      title: "SQL & Database Management",
      description: "Learn SQL from basics to advanced database operations.",
      duration: "5 weeks",
      level: "Beginner to Advanced",
      rating: 4.9,
      students: 520,
      logo: "🗄️",
      matchScore: 0,
      features: ["Database design", "Query optimization", "Real-world projects"]
    },
    {
      title: "Microsoft Power BI",
      description: "Create stunning dashboards and business intelligence reports.",
      duration: "4 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 340,
      logo: "📈",
      matchScore: 0,
      features: ["Dashboard creation", "Data modeling", "DAX formulas"]
    },
    {
      title: "Python Programming for Data Science",
      description: "Master Python for data manipulation and analysis.",
      duration: "6 weeks",
      level: "Beginner to Advanced",
      rating: 4.9,
      students: 680,
      logo: "🐍",
      matchScore: 0,
      features: ["Pandas & NumPy", "Data visualization", "Machine learning intro"]
    },
    {
      title: "Machine Learning Fundamentals",
      description: "Dive deep into ML algorithms and model building.",
      duration: "8 weeks",
      level: "Advanced",
      rating: 4.9,
      students: 420,
      logo: "🤖",
      matchScore: 0,
      features: ["Algorithm implementation", "Model evaluation", "Real-world applications"]
    },
    {
      title: "Generative AI & Its Tools",
      description: "Explore ChatGPT, Claude, and AI tools for business applications.",
      duration: "3 weeks",
      level: "Intermediate",
      rating: 5.0,
      students: 380,
      logo: "✨",
      matchScore: 0,
      features: ["AI tool integration", "Prompt engineering", "Business applications"]
    }
  ];

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      generateRecommendations();
    }
  };

  const generateRecommendations = () => {
    const scores = allCourses.map(course => {
      let score = 0;
      
      // Experience level matching
      if (answers.experience === 'Complete Beginner' && course.level === 'Beginner') score += 30;
      if (answers.experience === 'Some Experience' && course.level === 'Intermediate') score += 30;
      if (answers.experience === 'Intermediate' && course.level === 'Intermediate') score += 30;
      if (answers.experience === 'Advanced' && course.level === 'Advanced') score += 30;
      
      // Goal matching
      if (answers.goal === 'Career Change' && course.title.includes('Introduction')) score += 20;
      if (answers.goal === 'Skill Enhancement' && course.title.includes('Advanced')) score += 20;
      if (answers.goal === 'Business Growth' && course.title.includes('Power BI')) score += 20;
      
      // Focus area matching
      if (answers.focus === 'Data Analysis' && course.title.includes('Data Analysis')) score += 25;
      if (answers.focus === 'Machine Learning' && course.title.includes('Machine Learning')) score += 25;
      if (answers.focus === 'Business Intelligence' && course.title.includes('Power BI')) score += 25;
      if (answers.focus === 'Generative AI' && course.title.includes('Generative AI')) score += 25;
      if (answers.focus === 'Programming' && course.title.includes('Python')) score += 25;
      
      // Timeframe matching
      if (answers.timeframe === '2-4 hours' && course.duration === '3 weeks') score += 15;
      if (answers.timeframe === '5-8 hours' && course.duration === '4 weeks') score += 15;
      if (answers.timeframe === '10-15 hours' && course.duration === '5 weeks') score += 15;
      if (answers.timeframe === '20+ hours' && course.duration === '6 weeks') score += 15;
      
      return { ...course, matchScore: score };
    });

    const sortedRecommendations = scores
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);

    setRecommendations(sortedRecommendations);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setRecommendations([]);
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Search className="h-4 w-4" />
            <span>Course Finder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Find Your Perfect Course
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Answer a few questions and get personalized course recommendations tailored to your goals and experience level.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {!showResults ? (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Question {currentStep + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                  {currentQuestion.text}
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => handleAnswer(currentQuestion.id, option)}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{option}</span>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          ) : (
            /* Results */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Personalized Recommendations
                </h3>
                <p className="text-gray-600">
                  Based on your answers, here are the courses that best match your goals:
                </p>
              </div>

              <div className="space-y-6">
                {recommendations.map((course, index) => (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-2 border-blue-200 bg-blue-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{course.logo}</div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{course.title}</h4>
                          <p className="text-gray-600">{course.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {course.matchScore}% Match
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Target className="h-4 w-4" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <TrendingUp className="h-4 w-4" />
                        <span>{course.rating} ★ ({course.students} students)</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Key Features:</h5>
                      <div className="flex flex-wrap gap-2">
                        {course.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      Learn More About This Course
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={resetQuiz}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Take Quiz Again
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CourseFinder; 