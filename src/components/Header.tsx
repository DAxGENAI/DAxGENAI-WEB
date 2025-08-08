import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Phone, Search, User, ChevronDown, LogOut, Settings, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { AnimatedLogo3D } from './Logo3D';
// import AuthModal from './auth/AuthModal';
import { useAppStore } from '../store/useAppStore';
// import { authService } from '../services/authService';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  
  const { user, isAuthenticated, setUser, openDemoBooking } = useAppStore();

  const navItems = [
    { name: 'About', href: '#about', isRoute: false },
    { name: 'Courses', href: '#courses', isRoute: false },
    { name: 'Testimonials', href: '#testimonials', isRoute: false },
    { name: 'Pricing', href: '#pricing', isRoute: false },
    { name: 'Blog', href: '/blog', isRoute: true },
    { name: 'FAQ', href: '#faq', isRoute: false },
    { name: 'Contact', href: '#contact', isRoute: false },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position (only for non-route items)
      const scrollSections = navItems.filter(item => !item.isRoute).map(item => item.href.substring(1));
      const current = scrollSections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderNavItem = (item: { name: string; href: string; isRoute: boolean }) => {
    if (item.isRoute) {
      return (
        <Link
          key={item.name}
          to={item.href}
                  className={`relative font-medium text-sm xl:text-base transition-colors duration-200 ${
          location.pathname === item.href
            ? 'text-sky-400'
            : 'text-slate-300 hover:text-sky-400'
        }`}
          onClick={() => setIsMenuOpen(false)}
        >
          {item.name}
          {location.pathname === item.href && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-primary"
              layoutId="activeTab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </Link>
      );
    }

    return (
      <motion.a
        key={item.name}
        href={item.href}
        onClick={(e) => {
          e.preventDefault();
          handleNavClick(item.href);
        }}
        className={`relative font-medium text-sm xl:text-base transition-colors duration-200 ${
          activeSection === item.href.substring(1)
            ? 'text-sky-400'
            : 'text-slate-300 hover:text-sky-400'
        }`}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {item.name}
        {activeSection === item.href.substring(1) && (
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-primary"
            layoutId="activeTab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.a>
    );
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700' 
          : 'bg-slate-900/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatedLogo3D size={isScrolled ? 32 : 40} interactive={false} />
              <span className={`font-bold text-gradient transition-all duration-300 ${
                isScrolled ? 'text-xl' : 'text-2xl'
              }`}>
                DAxGENAI
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map(renderNavItem)}
          </nav>

          {/* Search and Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slate-300 hover:text-sky-400 transition-colors duration-200 rounded-lg hover:bg-slate-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </motion.button>
            
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-800 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-slate-300 font-medium">{user?.name}</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </motion.button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-2 z-50"
                    >
                                              <div className="px-4 py-2 border-b border-slate-700">
                          <p className="text-sm font-medium text-slate-200">{user?.name}</p>
                          <p className="text-xs text-slate-400">{user?.email}</p>
                        </div>
                        <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center space-x-2">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </button>
                        <button 
                          onClick={async () => {
                            // await authService.signOut();
                            setUser(null);
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-900/20 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => {
                    // Open demo booking modal
                    openDemoBooking();
                  }}
                  className="btn-primary flex items-center space-x-2 font-medium text-sm xl:text-base"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Video className="h-4 w-4" />
                  <span>Book Free Demo</span>
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <nav className="py-4 space-y-2">
                {navItems.map((item) => (
                  item.isRoute ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 ${
                        location.pathname === item.href ? 'text-blue-600 bg-blue-50' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 ${
                        activeSection === item.href.substring(1) ? 'text-blue-600 bg-blue-50' : ''
                      }`}
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.a>
                  )
                ))}
                {isAuthenticated ? (
                  <div className="px-4 py-3 space-y-2">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <button 
                                          onClick={async () => {
                      // await authService.signOut();
                      setUser(null);
                      setIsMenuOpen(false);
                    }}
                      className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="px-4 py-3 space-y-2">
                    <button
                      onClick={() => {
                        openDemoBooking();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
                    >
                      <Video className="h-4 w-4" />
                      <span>Book Free Demo</span>
                    </button>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
              onClick={() => setIsSearchOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search courses, topics, or resources..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 border-none outline-none text-lg placeholder-gray-400"
                      autoFocus
                      aria-label="Search"
                    />
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      aria-label="Close search"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {searchQuery ? (
                    <div className="text-sm text-gray-600">
                      Search results for "{searchQuery}" will appear here...
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Popular Searches</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Python', 'Power BI', 'Machine Learning', 'SQL', 'Data Analysis', 'AI'].map((term) => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth Modal */}
              {/* <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authView}
      /> */}
      </div>
    </header>
  );
};

export default Header;