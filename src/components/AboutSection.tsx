import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/public/Ajimii standing picture.jpg" 
              alt="Hon. Zannah Lawan Ajimi" 
              className="rounded-lg shadow-2xl"
            />
          </div>
          
          <div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6">Meet Hon. Zannah Lawan Ajimi</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Hon. Zannah Lawan Ajimi is a dynamic leader from Kaga Local Government Area of Borno State, 
              committed to advancing inclusive development and accountable leadership. With his engineering 
              background and passion for innovation, he brings a unique perspective to local governance.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              A graduate of Civil and Water Resources Engineering from the University of Maiduguri, Ajimi 
              has obtained multiple ICT certifications from both national and internationally recognized 
              institutions. His expertise in technology and infrastructure positions him perfectly to drive 
              digital transformation in Kaga.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Currently serving as a Governing Board Member of the Borno State Information and Communication 
              Technology Development Agency (BICTDA), Ajimi contributes to driving digital transformation 
              and ICT development across Borno State. He previously served as Senior Special Assistant to 
              the Governor on Science, Technology, and Innovation.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              As the Founder and CEO of Ajimi Creative Technology (ACT), he continues to empower youths 
              through digital literacy, innovation, and entrepreneurship. Known for his humility, commitment, 
              and visionary leadership, Ajimi embodies a new generation of purposeful youth leaders who stand 
              for unity, progress, and sustainable development.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Civil & Water Resources Engineering Graduate</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Governing Board Member, BICTDA</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Champion for Youth Empowerment & ICT Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
