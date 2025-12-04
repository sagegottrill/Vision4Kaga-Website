import React from 'react';

const platformIssues = [
  {
    id: 1,
    title: 'Education & Human Capital Development',
    description: 'Ensure equitable access to quality education and skills development across all wards in Kaga.',
    color: 'bg-blue-600',
    interventions: [
      'Rehabilitate schools',
      'Teacher incentives',
      'Digital literacy',
      'STEM scholarships'
    ]
  },
  {
    id: 2,
    title: 'Youth & Women Empowerment',
    description: 'Promote self-reliance through vocational training and entrepreneurship support.',
    color: 'bg-green-600',
    interventions: [
      'Vocational training',
      'Enterprise grants',
      'Mentorship programs',
      'Startup support'
    ]
  },
  {
    id: 3,
    title: 'Health & Environmental Sanitation',
    description: 'Strengthen healthcare systems and promote clean environment.',
    color: 'bg-teal-600',
    interventions: [
      'Revitalize PHCs',
      'WASH access',
      'Monthly sanitation',
      'Anti-drug campaigns'
    ]
  },
  {
    id: 4,
    title: 'Agriculture & Rural Economy',
    description: 'Boost food production and rural livelihoods through modernized agriculture.',
    color: 'bg-yellow-600',
    interventions: [
      'Mechanized farming',
      'Improved seeds',
      'Farmer cooperatives',
      'Livestock programs'
    ]
  },
  {
    id: 5,
    title: 'Peacebuilding & Security',
    description: 'Foster peaceful coexistence and grassroots security through inclusive mechanisms.',
    color: 'bg-indigo-600',
    interventions: [
      'Peace committees',
      'Security collaboration',
      'Community dialogues',
      'Capacity building'
    ]
  },
  {
    id: 6,
    title: 'Infrastructure & ICT Development',
    description: 'Enhance physical connectivity and digital inclusion for development.',
    color: 'bg-purple-600',
    interventions: [
      'Road rehabilitation',
      'Solar streetlights',
      'Water boreholes',
      'ICT centers'
    ]
  }
];

const PlatformSection: React.FC = () => {
  return (
    <section id="platform" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-black text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide mb-4">
            OUR ROADMAP
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Strategic Development Agenda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Six priority pillars designed for immediate impact, sustainability, and community relevance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platformIssues.map((issue) => (
            <div
              key={issue.id}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
                {issue.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
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
