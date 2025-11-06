import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/logo .png" 
              alt="Campaign Logo" 
              className="h-10 w-auto"
            />
            <div className="text-2xl font-serif font-bold text-blue-900">
              Hon. Zannah Lawan Ajimi
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-green-600 transition">About</button>
            <button onClick={() => scrollToSection('platform')} className="text-gray-700 hover:text-green-600 transition">Development Agenda</button>
            <button onClick={() => scrollToSection('volunteer')} className="text-gray-700 hover:text-green-600 transition">Get Involved</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-green-600 transition">Contact</button>
            <button onClick={() => scrollToSection('donate')} className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 hover:scale-105 transition transform">Support Campaign</button>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Admin Menu (Desktop) */}
            <button 
              onClick={() => navigate('/admin/login')}
              className="hidden md:block text-gray-500 hover:text-blue-600 transition"
              title="Admin Login"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 text-gray-700">About</button>
            <button onClick={() => scrollToSection('platform')} className="block w-full text-left py-2 text-gray-700">Development Agenda</button>
            <button onClick={() => scrollToSection('volunteer')} className="block w-full text-left py-2 text-gray-700">Get Involved</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-gray-700">Contact</button>
            <button onClick={() => scrollToSection('volunteer')} className="block w-full bg-blue-600 text-white py-3 rounded-lg">Volunteer</button>
            <button onClick={() => scrollToSection('donate')} className="block w-full bg-green-600 text-white py-3 rounded-lg">Support Campaign</button>
            
            {/* Admin Login in Mobile Menu */}
            <div className="pt-4 border-t border-gray-200">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); navigate('/admin/login'); }}
                className="flex items-center space-x-2 w-full text-left py-2 text-gray-600 hover:text-blue-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
