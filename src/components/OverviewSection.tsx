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
      name: 'Integrity', 
      description: 'Transparent and honest leadership in all governance matters',
      icon: '🛡️',
      color: 'blue',
      impact: '100% Transparency',
      example: 'Open budget processes and public accountability'
    },
    { 
      name: 'Equity', 
      description: 'Fair and inclusive development across all wards and communities',
      icon: '⚖️',
      color: 'green',
      impact: '15 Wards Covered',
      example: 'Equal opportunities for all communities'
    },
    { 
      name: 'Innovation', 
      description: 'Creative solutions leveraging technology and modern approaches',
      icon: '💡',
      color: 'purple',
      impact: 'Digital First',
      example: 'Smart governance and digital services'
    },
    { 
      name: 'Collaboration', 
      description: 'Partnership-driven progress with stakeholders and communities',
      icon: '🤝',
      color: 'orange',
      impact: '500+ Partners',
      example: 'Community-driven development initiatives'
    },
    { 
      name: 'Service', 
      description: 'Community-first approach prioritizing people\'s welfare',
      icon: '❤️',
      color: 'red',
      impact: '24/7 Service',
      example: 'Always available for community needs'
    },
    { 
      name: 'Resilience', 
      description: 'Sustainable long-term solutions for lasting development',
      icon: '🌱',
      color: 'teal',
      impact: 'Long-term Vision',
      example: 'Sustainable development for future generations'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Vision</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              To build a prosperous, secure, and inclusive Kaga local government where every community 
              thrives through equitable development, empowered communities, and responsive leadership.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-green-900 mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              To drive transformational development in Kaga Local Government through participatory governance, 
              strategic partnerships, and investments in human capital, infrastructure, and innovation, anchored 
              on transparency, accountability, and community-driven priorities.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div id="core-values" className="text-center mb-16">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Our Foundation
            </div>
            <h2 className="text-4xl font-bold text-blue-900 mb-4 bg-gradient-to-r from-blue-900 to-green-700 bg-clip-text text-transparent">
              Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our commitment to ethical, inclusive, and effective leadership drives every decision and action
            </p>
          </div>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {coreValues.map((value, index) => {
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-green-600',
              purple: 'from-purple-500 to-purple-600',
              orange: 'from-orange-500 to-orange-600',
              red: 'from-red-500 to-red-600',
              teal: 'from-teal-500 to-teal-600'
            };

            return (
              <div 
                key={index} 
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200 overflow-hidden cursor-pointer`}
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[value.color as keyof typeof colorClasses]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 p-8">
                  {/* Icon and number */}
                  <div className="flex items-center justify-center mb-6 relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[value.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-3xl">{value.icon}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-200 group-hover:bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                      {value.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                      {value.description}
                    </p>
                    
                    {/* Impact indicator */}
                    <div className="bg-gray-50 group-hover:bg-gray-100 rounded-lg p-3 transition-colors duration-300">
                      <div className="text-sm font-semibold text-gray-800 mb-1">{value.impact}</div>
                      <div className="text-xs text-gray-600">{value.example}</div>
                    </div>
                  </div>

                  {/* Hover effect line */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colorClasses[value.color as keyof typeof colorClasses]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Implementation Framework */}
        <div className="mt-16 bg-gray-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Implementation & Monitoring Framework</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-blue-900">1. Participatory Planning</h3>
              <p className="text-gray-600">
                Engage community stakeholders, ward representatives, and traditional institutions in identifying local needs and setting priorities.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-blue-900">2. Project Implementation Units</h3>
              <p className="text-gray-600">
                Establish implementation teams within the Local Government secretariat to oversee and coordinate the six core pillars.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-blue-900">3. Performance Indicators</h3>
              <p className="text-gray-600">
                Define clear performance metrics for every initiative to track outputs, outcomes, and impact.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-blue-900">4. Quarterly Progress Reports</h3>
              <p className="text-gray-600">
                Publish public updates and scorecards to inform citizens of milestones achieved and challenges encountered.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-blue-900">5. Monitoring & Evaluation</h3>
              <p className="text-gray-600">
                Create dedicated teams for periodic audits, field inspections, and data verification.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-blue-900">6. Partnership Engagement</h3>
              <p className="text-gray-600">
                Leverage support from Borno state government ministries, development partners, and NGOs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;


