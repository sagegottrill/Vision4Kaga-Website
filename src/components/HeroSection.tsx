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
        {/* Background gradient */}
        <div className="w-full h-full bg-gradient-to-br from-blue-900 via-green-800 to-blue-700"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/40"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
            Meet Hon. Zannah Lawan Ajimi
          </h1>
          
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Hon. Zannah Lawan Ajimi is a dynamic leader from Kaga Local Government Area of Borno State, 
              committed to advancing inclusive development and accountable leadership. With his engineering 
              background and passion for innovation, he brings a unique perspective to local governance.
            </p>
            
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              A graduate of Civil and Water Resources Engineering from the University of Maiduguri, Ajimi has 
              obtained multiple ICT certifications from both national and internationally recognized institutions. 
              His expertise in technology and infrastructure positions him perfectly to drive digital transformation in Kaga.
            </p>
            
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Currently serving as a Governing Board Member of the Borno State Information and Communication 
              Technology Development Agency (BICTDA), Ajimi contributes to driving digital transformation and 
              ICT development across Borno State. He previously served as Senior Special Assistant to the Governor 
              on Science, Technology, and Innovation.
            </p>
            
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              As the Founder and CEO of Ajimi Creative Technology (ACT), he continues to empower youths through 
              digital literacy, innovation, and entrepreneurship. Known for his humility, commitment, and visionary 
              leadership, Ajimi embodies a new generation of purposeful youth leaders who stand for unity, progress, 
              and sustainable development.
            </p>
          </div>
        </div>
        
        {/* Key Achievements */}
        <div className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-2">Civil & Water Resources Engineering Graduate</h3>
            <p className="text-green-200 text-sm">University of Maiduguri</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-2">Governing Board Member, BICTDA</h3>
            <p className="text-green-200 text-sm">Borno State ICT Development</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-2">Champion for Youth Empowerment & ICT Development</h3>
            <p className="text-green-200 text-sm">Founder & CEO, ACT</p>
          </div>
        </div>

        <div className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
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

        <div className={`mt-8 text-white/80 text-sm transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
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
