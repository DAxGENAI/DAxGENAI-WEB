import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '../firebase/config';
import { trackContactForm, trackDemoBooking } from './Analytics';
import DemoBooking from './DemoBooking';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    trainingInterest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showDemoBooking, setShowDemoBooking] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track form submission
      trackContactForm('contact_form');
      
      // Add form data to Firebase (temporarily disabled)
      // await addDoc(collection(db, 'contacts'), {
      //   ...formData,
      //   timestamp: serverTimestamp(),
      //   status: 'new'
      // });

      // Show success popup
      setShowSuccessPopup(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        trainingInterest: ''
      });

      // Hide popup after 5 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "training@daxgenai.com",
      description: "Get in touch via email"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      description: "Call us directly"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Online Training",
      description: "Global accessibility"
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
      description: "Quick responses guaranteed"
    }
  ];

  const trainingOptions = [
    "Introduction to Data Analysis with Generative AI",
    "Advanced Excel",
    "SQL & Databases",
    "Microsoft Power BI",
    "Python Programming",
    "Statistics",
    "Machine Learning",
    "Generative AI & Its Tools",
    "Complete Program",
    "Custom Training Package"
  ];

  return (
    <section id="contact" className="section section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get Started Today</h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            Ready to transform your career? Contact us to discuss your training needs and schedule your free demo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="flex flex-col h-full">
            <div className="flex-grow flex flex-col">
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-6">Contact Information</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-slate-200">{info.label}</h4>
                          <p className="text-sm text-slate-400">{info.description}</p>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg font-medium text-sky-400 break-all">{info.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card bg-gradient-primary text-white p-6 sm:p-8 flex flex-col flex-grow">
                <div className="flex-grow">
                  <div className="flex items-center mb-4">
                    <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 mr-3 flex-shrink-0" />
                    <h3 className="text-xl sm:text-2xl font-bold">Free Demo</h3>
                  </div>
                  <p className="text-sm sm:text-base text-blue-100 mb-6 leading-relaxed">
                    Book a 30-minute free demo to discuss your career goals, current skill level, 
                    and create a personalized learning plan that fits your schedule and objectives.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                      <span>Personalized career assessment</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                      <span>Custom learning roadmap</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                      <span>No commitment required</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    trackDemoBooking('contact_section');
                    setShowDemoBooking(true);
                  }}
                  className="w-full bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base flex items-center justify-center mt-6"
                >
                  Schedule Free Demo
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card flex flex-col h-full">
            <div className="flex-grow">
              <h3 className="text-xl sm:text-2xl font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-colors duration-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="trainingInterest" className="block text-sm font-medium text-slate-300 mb-2">
                      Training Interest
                    </label>
                    <select
                      id="trainingInterest"
                      name="trainingInterest"
                      value={formData.trainingInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-colors duration-200 appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="">Select a course</option>
                      {trainingOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-colors duration-200"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Tell us about your background, goals, and any specific questions you have..."
                  ></textarea>
                </div>
              </form>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="w-full btn-primary px-6 sm:px-8 py-3 sm:py-4 font-semibold flex items-center justify-center space-x-2 text-sm sm:text-base mt-6"
            >
              <Send className="h-5 w-5" />
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            </button>
          </div>
        </div>

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 animate-fadeInUp">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in our training programs. We'll get back to you within 24 hours to discuss your learning goals and schedule your free demo session.
                </p>
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Demo Booking Modal */}
        <DemoBooking 
          isOpen={showDemoBooking} 
          onClose={() => setShowDemoBooking(false)} 
        />
      </div>
    </section>
  );
};

export default Contact;