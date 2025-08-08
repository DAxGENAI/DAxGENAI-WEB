import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "What makes your training approach different from other online courses?",
      answer: "Our training is completely personalized with one-on-one sessions tailored to your specific learning pace and career goals. Unlike pre-recorded courses, you get direct access to an experienced Senior Data Analyst with real industry experience and immediate feedback on your progress.",
      category: "Training Approach"
    },
    {
      question: "How flexible is the scheduling for training sessions?",
      answer: "Very flexible! We understand that most students have full-time jobs or other commitments. Sessions can be scheduled during evenings, weekends, or any time that works for your schedule. We offer sessions across different time zones to accommodate global students.",
      category: "Scheduling"
    },
    {
      question: "Do I need any prior experience to start the training?",
      answer: "No prior experience is required for our beginner courses. We start from the fundamentals and build up your skills progressively. However, we also offer advanced courses for those with some background who want to enhance their expertise.",
      category: "Prerequisites"
    },
    {
      question: "How long does it typically take to complete a course?",
      answer: "Course duration varies by module - typically 3-8 weeks depending on the complexity and your availability. Our Complete Program takes about 6 months with bi-weekly sessions. We can adjust the pace based on your learning speed and schedule.",
      category: "Duration"
    },
    {
      question: "What kind of career support do you offer?",
      answer: "Our Complete Program includes resume review, LinkedIn profile optimization, mock interviews, and job search strategies. We also provide ongoing mentorship and can make introductions within our professional network when appropriate.",
      category: "Career Support"
    },
    {
      question: "What tools and software will I learn during the training?",
      answer: "You'll learn industry-standard tools including Excel, SQL, Python, Power BI, and various AI tools like ChatGPT and Claude. We focus on practical, real-world applications that you'll actually use in your career.",
      category: "Tools & Software"
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with your first few sessions, we'll refund your investment. Your success is our priority.",
      category: "Pricing & Guarantees"
    },
    {
      question: "Can I get a certificate upon completion?",
      answer: "Absolutely! You'll receive a professional certificate upon completing each course module and a comprehensive certificate for the complete program. These are recognized by employers and can be added to your LinkedIn profile.",
      category: "Certification"
    }
  ];

  const categories = ['All', 'Training Approach', 'Scheduling', 'Prerequisites', 'Duration', 'Career Support', 'Tools & Software', 'Pricing & Guarantees', 'Certification'];

  const filteredFaqData = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="faq" className="section section-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div 
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <HelpCircle className="h-10 w-10 sm:h-12 sm:w-12 text-sky-400" />
          </motion.div>
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Get answers to the most common questions about our training programs.
          </motion.p>
        </div>

        {/* Interactive Search and Filter */}
        <motion.div 
          className="mb-8 p-6 card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-slate-400">
            {filteredFaqData.length} questions found
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqData.map((item, index) => (
            <motion.div 
              key={index} 
              className="card border-2 border-transparent hover:border-sky-400 transition-colors duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className="w-full text-left p-4 sm:p-6 focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-200 pr-4 sm:pr-8">{item.question}</h3>
                    <span className="inline-block mt-2 px-2 py-1 bg-sky-400/20 text-sky-400 text-xs rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-sky-400 flex-shrink-0" />
                  </motion.div>
                </div>
              </button>
              
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="border-t border-slate-700 pt-4">
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredFaqData.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-slate-400 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg">No questions found matching your criteria</p>
              <p className="text-sm">Try adjusting your search or filter</p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="btn-outline"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        <div className="mt-12 text-center">
          <div className="card">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-sm sm:text-base text-slate-300 mb-6">
              Can't find the answer you're looking for? We're here to help with any specific questions about our training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-6 sm:px-8 py-3 font-semibold text-sm sm:text-base">
                Schedule Free Demo
              </button>
              <button className="btn-outline px-6 sm:px-8 py-3 font-semibold text-sm sm:text-base">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;