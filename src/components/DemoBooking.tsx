import React, { useState, useEffect } from 'react';
import { Video, X, CheckCircle, Calendar, Clock, Mail, Phone, User, Building, Target, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { demoBookingService, DemoBookingData } from '../services/demoBookingService';
import { trackDemoBooking } from './Analytics';

interface DemoFormData extends DemoBookingData {}

const DemoBooking = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

  const [formData, setFormData] = useState<DemoFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    experience: '',
    goals: '',
    preferredTime: '',
    preferredDate: '',
    timezone: 'Asia/Kolkata',
    trainingInterest: '',
    status: 'pending'
  });

  // Debug: Log API URL on component mount
  useEffect(() => {
    console.log('🔧 DemoBooking component mounted');
    console.log('🌐 VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('🌐 Default API URL:', 'http://localhost:5001');
    console.log('🌐 Final API URL:', import.meta.env.VITE_API_URL || 'http://localhost:5001');
    
    // Auto-test backend connection when component mounts
    demoBookingService.testBackendConnection().then(isConnected => {
      console.log('🔗 Initial backend connection test:', isConnected);
    });
  }, []);

  // Test backend connection manually
  const testBackend = async () => {
    console.log('🧪 Manual backend test...');
    const isConnected = await demoBookingService.testBackendConnection();
    alert(isConnected ? '✅ Backend connection successful!' : '❌ Backend connection failed!');
  };

  const trainingOptions = [
    "Introduction to Data Analysis with Generative AI",
    "Advanced Excel for Data Analysis",
    "SQL & Database Management",
    "Microsoft Power BI",
    "Python Programming for Data Science",
    "Statistics for Data Analysis",
    "Machine Learning Fundamentals",
    "Generative AI & Its Tools",
    "Complete Program",
    "Custom Training Package"
  ];

  const timeSlots = [
    { time: '09:00', available: true, label: '9:00 AM' },
    { time: '10:00', available: true, label: '10:00 AM' },
    { time: '11:00', available: true, label: '11:00 AM' },
    { time: '14:00', available: true, label: '2:00 PM' },
    { time: '15:00', available: true, label: '3:00 PM' },
    { time: '16:00', available: true, label: '4:00 PM' },
    { time: '17:00', available: true, label: '5:00 PM' },
    { time: '18:00', available: true, label: '6:00 PM' },
    { time: '19:00', available: true, label: '7:00 PM' },
    { time: '20:00', available: true, label: '8:00 PM' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      preferredDate: date.toISOString().split('T')[0]
    });
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData({
      ...formData,
      preferredTime: time
    });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.name.trim() !== '' && 
               formData.email.trim() !== '' && 
               formData.phone.trim() !== '';
      case 2:
        return formData.trainingInterest !== '' && 
               formData.experience !== '' && 
               formData.goals.trim() !== '';
      case 3:
        return selectedDate !== null && selectedTime !== '';
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Test backend connection first
      console.log('🧪 Testing backend connection before booking...');
      const isConnected = await demoBookingService.testBackendConnection();
      console.log('🔗 Backend connection test result:', isConnected);
      
      if (!isConnected) {
        throw new Error('Cannot connect to backend server. Please check your internet connection.');
      }

      // Validate form data
      const validation = demoBookingService.validateBookingData(formData);
      if (!validation.isValid) {
        alert(`Please fix the following errors:\n${validation.errors.join('\n')}`);
        return;
      }

      // Track the booking
      trackDemoBooking('demo_booking_form');

      console.log('Submitting demo booking with data:', formData);

      // Create demo booking with Google Calendar integration
      const result = await demoBookingService.createDemoBooking(formData);
      
      console.log('Demo booking created successfully:', result);
      
      setBookingId(result.bookingId);

      setShowSuccess(true);
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
        setCurrentStep(1);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          role: '',
          experience: '',
          goals: '',
          preferredTime: '',
          preferredDate: '',
          timezone: 'Asia/Kolkata',
          trainingInterest: '',
          status: 'pending'
        });
      }, 5000); // Show success message longer since it's more important
    } catch (error) {
      console.error('Error submitting demo booking:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        formData: formData
      });
      alert(`Failed to book demo: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try again or contact us directly.`);
    } finally {
      setIsSubmitting(false);
    }
  };



  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Video className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Book Your Free Demo</h2>
                <p className="text-blue-100">30-minute personalized session</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={testBackend} 
                className="text-white hover:text-blue-100 transition-colors text-sm bg-blue-700 px-3 py-1 rounded"
                title="Test backend connection"
              >
                Test API
              </button>
              <button onClick={onClose} className="text-white hover:text-blue-100 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Step {currentStep} of 4</span>
              <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-blue-500 rounded-full h-2">
              <motion.div
                className="bg-white h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h3>
                    <p className="text-gray-600 mb-6">Let's start with your basic details to personalize your demo session.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        I am a
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="e.g., Data Analyst, Student, Business Owner"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Goals & Experience</h3>
                    <p className="text-gray-600 mb-6">Help us understand your background and objectives for better personalization.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Role *
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="e.g., Data Analyst, Student, Business Owner"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience Level *
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem'
                        }}
                        required
                      >
                        <option value="">Select your experience level</option>
                        <option value="beginner">Beginner (0-1 years)</option>
                        <option value="intermediate">Intermediate (1-3 years)</option>
                        <option value="advanced">Advanced (3+ years)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Training Interest *
                      </label>
                      <select
                        name="trainingInterest"
                        value={formData.trainingInterest}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem'
                        }}
                        required
                      >
                        <option value="">Select your training interest</option>
                        {trainingOptions.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Career Goals *
                      </label>
                      <textarea
                        name="goals"
                        value={formData.goals}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Tell us about your career goals and what you hope to achieve..."
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Schedule Your Demo</h3>
                    <p className="text-gray-600 mb-6">Choose a convenient time for your 30-minute personalized demo session.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date *
                      </label>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {getAvailableDates().map((date, index) => (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(date)}
                            className={`w-full p-3 text-left rounded-lg border transition-colors ${
                              selectedDate && selectedDate.toDateString() === date.toDateString()
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50 text-gray-900'
                            }`}
                          >
                            <div className="font-medium">{formatDate(date)}</div>
                            <div className={`text-sm ${
                              selectedDate && selectedDate.toDateString() === date.toDateString()
                                ? 'text-blue-600'
                                : 'text-gray-500'
                            }`}>
                              {date.toLocaleDateString('en-US', { weekday: 'long' })}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time *
                      </label>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                        {timeSlots.map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => handleTimeSelect(slot.time)}
                            className={`p-3 text-center rounded-lg border transition-colors ${
                              selectedTime === slot.time
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50 text-gray-900'
                            }`}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="Asia/Kolkata">India (IST)</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                      <option value="Asia/Dubai">Dubai (GST)</option>
                      <option value="Asia/Singapore">Singapore (SGT)</option>
                      <option value="Australia/Sydney">Sydney (AEST)</option>
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Review & Confirm</h3>
                    <p className="text-gray-600 mb-6">Please review your information before booking your demo.</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Name:</strong> {formData.name}</p>
                          <p><strong>Email:</strong> {formData.email}</p>
                          <p><strong>Phone:</strong> {formData.phone}</p>
                          {formData.company && <p><strong>I am a:</strong> {formData.company}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Demo Details</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Date:</strong> {selectedDate ? formatDate(selectedDate) : 'Not selected'}</p>
                          <p><strong>Time:</strong> {selectedTime || 'Not selected'}</p>
                          <p><strong>Timezone:</strong> {formData.timezone}</p>
                          <p><strong>Interest:</strong> {formData.trainingInterest}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Career Goals</h4>
                      <p className="text-sm text-gray-600">{formData.goals}</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">What to Expect</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• 30-minute personalized demo session</li>
                      <li>• Career assessment and roadmap creation</li>
                      <li>• Q&A about our training programs</li>
                      <li>• Google Meet link will be sent via email</li>
                      <li>• No obligation to purchase</li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-3">
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                className="px-6 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !validateStep(currentStep)}
                className="px-6 py-2 rounded-lg font-medium transition-colors bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Booking...' : 'Book Demo'}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Demo Booked Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your demo has been scheduled! You'll receive a confirmation email with the Google Meet link within the next few minutes.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Booking ID:</strong> {bookingId}
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DemoBooking;
