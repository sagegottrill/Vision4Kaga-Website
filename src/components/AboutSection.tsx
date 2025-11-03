import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <img 
              src="/ajimi.png" 
              alt="Hon. Zannah Lawan Ajimi" 
              className="rounded-2xl shadow-2xl w-full object-cover mb-6"
            />
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">APC Chairmanship Candidate</h4>
                  <p className="text-sm text-gray-600">Kaga Local Government</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Civil & Water Resources Engineering Graduate</h4>
                  <p className="text-sm text-gray-600">University of Maiduguri</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Governing Board Member, BICTDA</h4>
                  <p className="text-sm text-gray-600">Borno State ICT Development Agency</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Champion for Youth Empowerment & ICT Development</h4>
                  <p className="text-sm text-gray-600">Founder & CEO, Ajimi Creative Technology</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-blue-900 mb-4 md:mb-6 leading-tight">Meet Hon. Zannah Lawan Ajimi</h2>
            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
