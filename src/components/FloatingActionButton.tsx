import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Share2, ArrowUp } from 'lucide-react';

const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Vision for a New Kaga',
        text: 'Support Hon. Zannah Lawan Ajimi for Kaga LGA Chairmanship',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <div className={`flex flex-col space-y-3 mb-4 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <button
          onClick={scrollToTop}
          className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-110"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => window.open('tel:+2341234567890')}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
          title="Call us"
        >
          <Phone className="w-5 h-5" />
        </button>
        
        <button
          onClick={handleShare}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 hover:scale-110"
          title="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition-all duration-300 hover:scale-110"
          title="Contact us"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-all duration-300 hover:scale-110 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        title={isOpen ? 'Close menu' : 'Quick actions'}
      >
        <div className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default FloatingActionButton;
