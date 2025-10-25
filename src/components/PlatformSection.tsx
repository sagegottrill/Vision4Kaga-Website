import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './ui/modal';

const platformIssues = [
  { 
    id: 1, 
    title: 'Education & Human Capital Development', 
    icon: '🎓', 
    description: 'Ensure equitable access to quality education and skills development across all wards in Kaga. Rehabilitate schools, provide teacher incentives, promote digital literacy, and establish education trust funds for STEM scholarships.',
    interventions: [
      'Rehabilitate and equip public primary and secondary schools with modern learning tools',
      'Provide incentives to outstanding teachers and educational volunteers',
      'Promote digital literacy in schools and launch adult literacy programs',
      'Create Education Council and establish Education Trust Fund for STEM scholarships',
      'Reintegrate school dropouts and offer free JAMB registration to indigenous students'
    ]
  },
  { 
    id: 2, 
    title: 'Youth & Women Empowerment', 
    icon: '👥', 
    description: 'Promote self-reliance through vocational training and entrepreneurship support. Revitalize vocational skill centers, introduce enterprise grants, and establish empowerment centers for training and mentorship.',
    interventions: [
      'Revitalize Kaga Vocational Skill Center (ICT, agriculture, crafts, entrepreneurship)',
      'Partner with skilled artisans as community-based trainers',
      'Introduce Kaga Enterprise Grant for young entrepreneurs and startups',
      'Establish Women and Youth Empowerment Centers for training and mentorship',
      'Host capacity-building programs to turn job seekers into job creators'
    ]
  },
  { 
    id: 3, 
    title: 'Health & Environmental Sanitation', 
    icon: '🏥', 
    description: 'Strengthen healthcare systems and promote clean environment. Revitalize primary healthcare centers, improve WASH access, institutionalize monthly sanitation programs, and launch anti-drug abuse campaigns.',
    interventions: [
      'Revitalize primary Health Care centres across all wards',
      'Improve access to clean water and WASH, particularly in rural health centers',
      'Institutionalize monthly sanitation programs modeled after Borno State policy',
      'Launch anti-drug abuse education and prevention campaigns across communities',
      'Strengthen community health workers and outreach programs'
    ]
  },
  { 
    id: 4, 
    title: 'Agriculture & Rural Economy', 
    icon: '🌾', 
    description: 'Boost food production and rural livelihoods through modernized agriculture. Establish mechanized farming clusters, distribute improved seeds and equipment, train farmer cooperatives, and strengthen livestock programs.',
    interventions: [
      'Establish mechanized farming clusters and introduce support schemes',
      'Distribute improved seeds, fertilizers, and farm equipment to farmers',
      'Train and support farmers\' cooperatives with access to markets and finance',
      'Strengthen veterinary services and livestock production programs',
      'Distribute livestock to women to support household income and food security'
    ]
  },
  { 
    id: 5, 
    title: 'Peacebuilding & Security', 
    icon: '🛡️', 
    description: 'Foster peaceful coexistence and grassroots security through inclusive mechanisms. Strengthen ward peace committees, collaborate with security forces, hold community dialogues, and build capacity of local security personnel.',
    interventions: [
      'Strengthen Ward Peace Committees and mediation systems',
      'Collaborate with vigilantes, traditional rulers, and security forces',
      'Hold town hall forums and community dialogues to promote peaceful coexistence',
      'Recognize and reward communities that meet security benchmarks',
      'Build capacity of local security personnel (Vigilantes, Hunters, CJTF\'s and Volunteers)'
    ]
  },
  { 
    id: 6, 
    title: 'Infrastructure & ICT Development', 
    icon: '🏗️', 
    description: 'Enhance physical connectivity and digital inclusion for development. Rehabilitate roads, install solar streetlights, drill boreholes, revitalize ICT centers, and digitize governance processes.',
    interventions: [
      'Rehabilitate rural and township roads to connect economic centers',
      'Install solar-powered streetlights in towns, markets, and public areas',
      'Drill boreholes in underserved areas to ensure clean water access',
      'Revitalize existing ICT centre and establish JAMB CBT center',
      'Digitize local governance processes for transparency and efficiency'
    ]
  }
];

const PlatformSection: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = (issueId: number) => {
    setSelectedIssue(issueId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };

  return (
    <section id="platform" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
            Strategic Blueprint
          </div>
          <h2 className="text-4xl font-bold text-blue-900 mb-4 bg-gradient-to-r from-blue-900 to-green-700 bg-clip-text text-transparent">
            Strategic Development Agenda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Six priority pillars designed for immediate impact, sustainability, and community relevance. 
            This comprehensive plan outlines our vision for transforming Kaga Local Government Area.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {platformIssues.map((issue) => (
            <div 
              key={issue.id}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 hover:border-green-200 relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{issue.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-green-700 transition-colors duration-300">{issue.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                  {issue.description}
                </p>
                <button 
                  onClick={() => handleViewDetails(issue.id)}
                  className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors duration-300 group-hover:translate-x-1"
                >
                  Tap to view
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Glass Morphism Modal for Detailed Interventions */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
          title={selectedIssue ? platformIssues[selectedIssue - 1].title : ''}
        >
          {selectedIssue && (
            <div>
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{platformIssues[selectedIssue - 1].icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{platformIssues[selectedIssue - 1].title}</h3>
                  <p className="text-gray-600">Key Interventions & Implementation Plan</p>
                </div>
              </div>
              
              <div className="grid gap-4 mb-8">
                {platformIssues[selectedIssue - 1].interventions.map((intervention, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-800 leading-relaxed">{intervention}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-white/20">
                <h4 className="font-semibold text-lg text-gray-900 mb-4">Implementation Framework</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-green-500/10 backdrop-blur-sm rounded-lg border border-green-500/20">
                    <h5 className="font-semibold text-green-800 mb-2">Phase 1: Foundation</h5>
                    <p className="text-green-700">Initial assessment and stakeholder engagement</p>
                  </div>
                  <div className="p-4 bg-yellow-500/10 backdrop-blur-sm rounded-lg border border-yellow-500/20">
                    <h5 className="font-semibold text-yellow-800 mb-2">Phase 2: Implementation</h5>
                    <p className="text-yellow-700">Rollout of key interventions and programs</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 backdrop-blur-sm rounded-lg border border-blue-500/20">
                    <h5 className="font-semibold text-blue-800 mb-2">Phase 3: Monitoring</h5>
                    <p className="text-blue-700">Continuous evaluation and improvement</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default PlatformSection;
