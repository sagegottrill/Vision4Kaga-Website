import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Carousel images
  const carouselImages = [
    '/hero c/1.jpg',
    '/hero c/2.jpg',
    '/hero c/4.jpg',
    '/hero c/5.jpg',
    '/MARKET.jpg',
    '/hero c/ss.jpg',
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-advance carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20 overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center justify-center">
            <img 
              src="/logo .png" 
              alt="Campaign Logo" 
              className="h-24 md:h-32 lg:h-40 w-auto"
            />
          </div>
        </div>

        {/* Main Heading */}
        <div className={`mb-4 md:mb-6 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-3 md:mb-4 leading-tight px-4">
            Vision for a New Kaga
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed px-4">
            Advancing Inclusive Development and Accountable Leadership in Kaga Local Government Area
          </p>
        </div>
        
        {/* Statistics Cards */}
        <div className={`mb-6 md:mb-8 grid grid-cols-3 gap-2 sm:gap-4 max-w-3xl mx-auto px-4 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 md:p-6 border border-white/20">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">6</div>
            <div className="text-white/80 text-xs sm:text-sm">Development Pillars</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 md:p-6 border border-white/20">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">100%</div>
            <div className="text-white/80 text-xs sm:text-sm">Community Focused</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 md:p-6 border border-white/20">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">2yrs</div>
            <div className="text-white/80 text-xs sm:text-sm">Transformation Year</div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button 
            onClick={() => scrollToSection('platform')}
            className="w-full sm:w-auto bg-green-600 text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-xl"
          >
            View Development Agenda
          </button>
          <button 
            onClick={() => scrollToSection('volunteer')}
            className="w-full sm:w-auto bg-white text-gray-900 px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl"
          >
            Join the Movement
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
