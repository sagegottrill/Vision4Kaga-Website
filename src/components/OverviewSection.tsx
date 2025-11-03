import React, { useState, useEffect } from 'react';

const OverviewSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('core-values');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const coreValues = [
    { 
      name: 'INTEGRITY', 
      description: 'Transparent and honest leadership in all governance matters',
      icon: '🛡️',
      color: 'blue',
      impact: '100% Transparency',
      example: 'Open budget processes and public accountability'
    },
    { 
      name: 'EQUITY', 
      description: 'Fair and inclusive development across all wards and communities',
      icon: '⚖️',
      color: 'green',
      impact: '15 Wards Covered',
      example: 'Equal opportunities for all communities'
    },
    { 
      name: 'INNOVATION', 
      description: 'Creative solutions leveraging technology and modern approaches',
      icon: '💡',
      color: 'purple',
      impact: 'Digital First',
      example: 'Smart governance and digital services'
    },
    { 
      name: 'COLLABORATION', 
      description: 'Partnership-driven progress with stakeholders and communities',
      icon: '🤝',
      color: 'orange',
      impact: '500+ Partners',
      example: 'Community-driven development initiatives'
    },
    { 
      name: 'SERVICE', 
      description: 'Community-first approach prioritizing people\'s welfare',
      icon: '❤️',
      color: 'red',
      impact: '24/7 Service',
      example: 'Always available for community needs'
    },
    { 
      name: 'RESILIENCE', 
      description: 'Sustainable long-term solutions for lasting development',
      icon: '🌱',
      color: 'teal',
      impact: 'Long-term Vision',
      example: 'Sustainable development for future generations'
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-blue-900 mb-4 md:mb-6">Our Vision</h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              To build a prosperous, secure, and inclusive Kaga local government where every community 
              thrives through equitable development, empowered communities, and responsive leadership.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-blue-900 mb-4 md:mb-6">Our Mission</h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              To drive transformational development in Kaga Local Government through participatory governance, 
              strategic partnerships, and investments in human capital, infrastructure, and innovation, anchored 
              on transparency, accountability, and community-driven priorities.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div id="core-values" className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-900 mb-3 md:mb-4">
            Core Values
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8">
            Our commitment to ethical, inclusive, and effective leadership drives every decision and action
          </p>
          
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-8">
              {[...coreValues, ...coreValues].map((value, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-80 p-6 bg-transparent text-left"
                >
                  <div className="space-y-2">
                    <h3 className="font-semibold text-xl text-blue-900">{value.name}</h3>
                    <p className="text-gray-700">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll 15s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
};

export default OverviewSection;


