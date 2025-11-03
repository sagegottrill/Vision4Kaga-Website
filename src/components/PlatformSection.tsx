import React from 'react';

const platformIssues = [
  { 
    id: 1, 
    title: 'Education & Human Capital Development', 
    icon: (
      <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
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
    icon: (
      <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
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
    icon: (
      <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
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
    icon: (
      <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
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
    icon: (
      <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
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
    icon: (
      <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
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
  return (
    <section id="platform" className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-blue-900 mb-4 leading-tight">
            Strategic Development Agenda
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
            Six priority pillars designed for immediate impact, sustainability, and community relevance. 
            This comprehensive plan outlines our vision for transforming Kaga Local Government Area.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {platformIssues.map((issue) => (
            <div 
              key={issue.id}
              className="bg-white rounded-lg p-4 md:p-6 shadow-md border border-gray-200"
            >
              <div className="mb-3 md:mb-4">{issue.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">{issue.title}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {issue.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
