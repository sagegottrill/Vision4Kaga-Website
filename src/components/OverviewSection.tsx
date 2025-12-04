import React, { useState, useEffect } from 'react';

const OverviewSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      color: 'bg-blue-100 text-blue-600',
    },
    {
      name: 'EQUITY',
      description: 'Fair and inclusive development across all wards and communities',
      color: 'bg-green-100 text-green-600',
    },
    {
      name: 'INNOVATION',
      description: 'Creative solutions leveraging technology and modern approaches',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      name: 'COLLABORATION',
      description: 'Partnership-driven progress with stakeholders and communities',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      name: 'SERVICE',
      description: 'Community-first approach prioritizing people\'s welfare',
      color: 'bg-red-100 text-red-600',
    },
    {
      name: 'RESILIENCE',
      description: 'Sustainable long-term solutions for lasting development',
      color: 'bg-teal-100 text-teal-600',
    }
  ];

  return (
    <section className="bg-white">
      {/* Vision & Mission - Dark Theme for Contrast */}
      <div className="bg-blue-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-6">
              <div className="inline-block bg-blue-800 px-4 py-1 rounded-full text-sm font-semibold tracking-wide text-blue-200">
                OUR VISION
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
                Building a Prosperous Future
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                To build a prosperous, secure, and inclusive Kaga local government where every community
                thrives through equitable development, empowered communities, and responsive leadership.
              </p>
            </div>

            <div className="space-y-6">
              <div className="inline-block bg-green-900 px-4 py-1 rounded-full text-sm font-semibold tracking-wide text-green-200">
                OUR MISSION
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
                Driving Transformation
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                To drive transformational development in Kaga Local Government through participatory governance,
                strategic partnerships, and investments in human capital, infrastructure, and innovation, anchored
                on transparency, accountability, and community-driven priorities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values - Light Theme with Carousel */}
      <div id="core-values" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our commitment to ethical, inclusive, and effective leadership drives every decision and action.
            </p>
          </div>

          <div className="relative overflow-hidden py-4">
            <div className="flex animate-scroll gap-6">
              {[...coreValues, ...coreValues].map((value, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-72 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{value.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
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
          animation: scroll 30s linear infinite;
          width: max-content;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default OverviewSection;
