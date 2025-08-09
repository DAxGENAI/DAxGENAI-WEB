import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]);

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
      answer: "Our training is completely personalized with one-on-one sessions tailored to your specific learning pace and career goals. Unlike pre-recorded courses, you get direct access to an experienced Senior Data Analyst with real industry experience and immediate feedback on your progress."
    },
    {
      question: "How does 1-on-1 training compare to group classes?",
      answer: "1-on-1 training is significantly more effective because you get undivided attention, immediate answers to questions, and a curriculum tailored specifically to your needs. No waiting for others, no feeling left behind, and no generic content that doesn't apply to your situation."
    },
    {
      question: "How flexible is the scheduling for training sessions?",
      answer: "Very flexible! We understand that most students have full-time jobs or other commitments. Sessions can be scheduled during evenings, weekends, or any time that works for your schedule. We offer sessions across different time zones to accommodate global students."
    },
    {
      question: "What if I'm a slow learner or need extra help?",
      answer: "That's exactly why 1-on-1 training is perfect for you! We can slow down, repeat concepts, and spend extra time on areas you find challenging. Your trainer adapts to your learning pace - there's no pressure to keep up with others."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with your first few sessions, we'll refund your investment. Your success is our priority."
    }
  ];

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
            Get answers to the most common questions about our 1-on-1 training programs.
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="card cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => toggleItem(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-200 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-sky-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-sky-400 flex-shrink-0" />
                  )}
                </motion.div>
              </div>
              
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-300 mt-4 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;