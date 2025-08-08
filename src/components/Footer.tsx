import React from 'react';
import { BookOpen, Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Download } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    courses: [
      { name: "Data Analysis with AI", href: "#" },
      { name: "Advanced Excel", href: "#" },
      { name: "SQL & Databases", href: "#" },
      { name: "Microsoft Power BI", href: "#" },
      { name: "Python Programming", href: "#" },
      { name: "Machine Learning", href: "#" }
    ],
    resources: [
      { name: "Course Roadmap", href: "#" },
      { name: "Free Resources", href: "#" },
      { name: "Blog Articles", href: "#" },
      { name: "Success Stories", href: "#" },
      { name: "Career Guide", href: "#" },
      { name: "Interview Prep", href: "#" }
    ],
    company: [
      { name: "About Trainer", href: "#about" },
      { name: "Teaching Approach", href: "#" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "FAQ", href: "#faq" },
      { name: "Contact", href: "#contact" },
      { name: "Privacy Policy", href: "#" }
    ]
  };

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-sky-400" />
              <span className="text-xl sm:text-2xl font-bold text-gradient">DAxGENAI</span>
            </div>
            <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
              Transforming careers through personalized Data Analysis and AI training. 
              Join 2000+ successful students who have advanced their careers with our one-on-one approach.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-sky-400" />
                <span className="text-slate-300">training@daxgenai.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-sky-400" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-sky-400" />
                <span className="text-slate-300">Online Training Worldwide</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Courses Links */}
          <div className="lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Training Courses</h3>
            <ul className="space-y-3">
              {footerLinks.courses.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-sky-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Company</h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Download Resources */}
            <div className="bg-gray-800 p-3 sm:p-4 rounded-lg">
              <h4 className="text-sm sm:text-base font-semibold mb-3 flex items-center">
                <Download className="h-4 w-4 mr-2 text-blue-400" />
                Free Downloads
              </h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  Course Brochure (PDF)
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  Career Roadmap (PDF)
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  Free Python Cheatsheet
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 mt-8 sm:mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-sm sm:text-base text-blue-100 mb-6 max-w-2xl mx-auto">
              Get the latest insights on data analysis, AI trends, and career tips delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              />
              <button className="bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 mt-8 sm:mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2024 DAxGENAI. All rights reserved. Empowering careers through personalized data training.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-xs sm:text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-xs sm:text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-xs sm:text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;