import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        {/* Background gradient as fallback */}
        <div className="w-full h-full bg-gradient-to-br from-blue-900 via-green-800 to-blue-700"></div>
        <img 
          src="/hero-image.jpg" 
          alt="Hon. Zannah Lawan Ajimi" 
          className="w-full h-full object-cover md:object-cover object-top absolute inset-0"
          onError={(e) => {
            console.log('Image failed to load, using gradient background');
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/40"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
            Vision for a New Kaga
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto leading-relaxed">
            Advancing Inclusive Development and Accountable Leadership in Kaga Local Government Area
          </p>
        </div>
        
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button 
            onClick={() => scrollToSection('platform')}
            className="group bg-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 relative overflow-hidden"
          >
            <span className="relative z-10">View Development Agenda</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button 
            onClick={() => scrollToSection('volunteer')}
            className="group bg-white text-green-700 px-10 py-4 rounded-full text-lg font-semibold hover:bg-green-50 hover:scale-105 transition-all duration-300 shadow-2xl border-2 border-green-600 hover:border-green-700 relative overflow-hidden"
          >
            <span className="relative z-10">Join the Movement</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
        
        {/* Animated Statistics */}
        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 max-w-4xl mx-auto transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">6</div>
            <div className="text-green-200 text-sm font-medium">Development Pillars</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-green-200 text-sm font-medium">Community Focused</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">2025</div>
            <div className="text-green-200 text-sm font-medium">Transformation Year</div>
          </div>
        </div>

        <div className={`mt-6 text-white/80 text-sm transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="flex items-center justify-center space-x-2 flex-wrap">
            <img 
              src="/apc logo.png" 
              alt="APC Logo" 
              className="h-5 w-auto"
            />
            <span className="text-center">APC Chairmanship Candidate • Kaga Local Government • Borno State</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
