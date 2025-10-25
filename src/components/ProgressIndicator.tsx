import React, { useState, useEffect } from 'react';

interface ProgressIndicatorProps {
  target: number;
  current: number;
  label: string;
  color?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  target, 
  current, 
  label, 
  color = 'green' 
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const percentage = Math.min((current / target) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
        <span className="text-2xl font-bold text-gray-900">{Math.round(animatedProgress)}%</span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full ${colorClasses[color as keyof typeof colorClasses]} transition-all duration-1000 ease-out rounded-full`}
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{current.toLocaleString()}</span>
          <span>{target.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

const ProgressSection: React.FC = () => {
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

    const element = document.getElementById('progress-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="progress-section" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            Campaign Progress
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact So Far</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track our progress as we work towards transforming Kaga Local Government Area
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <ProgressIndicator
            target={10000}
            current={7500}
            label="Community Engagements"
            color="green"
          />
          <ProgressIndicator
            target={5000}
            current={3200}
            label="Volunteer Sign-ups"
            color="blue"
          />
          <ProgressIndicator
            target={1000}
            current={650}
            label="Policy Proposals"
            color="purple"
          />
          <ProgressIndicator
            target={500}
            current={420}
            label="Community Projects"
            color="orange"
          />
        </div>

        {/* Achievement Badges */}
        <div className={`mt-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Recent Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏆</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Community Leader</h4>
              <p className="text-sm text-gray-600">15+ Years</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Education Advocate</h4>
              <p className="text-sm text-gray-600">500+ Students</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Peace Builder</h4>
              <p className="text-sm text-gray-600">50+ Communities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💼</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Development Expert</h4>
              <p className="text-sm text-gray-600">100+ Projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
