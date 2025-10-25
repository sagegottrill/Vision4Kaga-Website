import React, { useState } from 'react';

const newsData = [
  { id: 1, title: 'Sarah Mitchell Announces Candidacy for State Senate', category: 'Press Release', date: 'Oct 15, 2025', image: 'https://d64gsuwffb70l.cloudfront.net/68f5030a465a4614ba5ad0d9_1760887630464_25f93ec9.webp', excerpt: 'After years of community service, Sarah officially launches her campaign with a focus on education and healthcare reform.' },
  { id: 2, title: 'Town Hall Meeting: Healthcare for All', category: 'Event', date: 'Oct 12, 2025', image: 'https://d64gsuwffb70l.cloudfront.net/68f5030a465a4614ba5ad0d9_1760887633794_d90f3e2c.webp', excerpt: 'Join us for a community discussion on expanding healthcare access and lowering prescription costs.' },
  { id: 3, title: 'Teachers Union Endorses Mitchell Campaign', category: 'Endorsement', date: 'Oct 10, 2025', image: 'https://d64gsuwffb70l.cloudfront.net/68f5030a465a4614ba5ad0d9_1760887635578_75d5e75b.webp', excerpt: 'State Teachers Association announces full support citing Sarah\'s 15-year record in education advocacy.' },
  { id: 4, title: 'New Climate Action Plan Released', category: 'Press Release', date: 'Oct 8, 2025', image: 'https://d64gsuwffb70l.cloudfront.net/68f5030a465a4614ba5ad0d9_1760887637340_efb89231.webp', excerpt: 'Comprehensive plan aims for 100% renewable energy by 2035 while creating thousands of green jobs.' },
  { id: 5, title: 'Community Canvass: Join Us This Weekend', category: 'Event', date: 'Oct 5, 2025', image: 'https://d64gsuwffb70l.cloudfront.net/68f5030a465a4614ba5ad0d9_1760887639079_53177648.webp', excerpt: 'Volunteers needed for door-to-door outreach. Free training and materials provided.' },
  { id: 6, title: 'Affordable Housing Initiative Gains Momentum', category: 'Press Release', date: 'Oct 3, 2025', image: 'https://d64gsuwffb70l.cloudfront.net/68f5030a465a4614ba5ad0d9_1760887640834_cbc32c74.webp', excerpt: 'Sarah\'s plan to build 5,000 affordable units receives support from housing advocates and developers.' },
  { id: 7, title: 'Veterans Groups Announce Support', category: 'Endorsement', date: 'Sep 30, 2025', image: 'https://d64gsuwffb70l.cloudfront.net/68f5030a465a4614ba5ad0d9_1760887642579_b3bf895d.webp', excerpt: 'Multiple veterans organizations back Mitchell\'s comprehensive veterans services expansion plan.' },
  { id: 8, title: 'Small Business Roundtable Discussion', category: 'Event', date: 'Sep 28, 2025', image: 'https://d64gsuwffb70l.cloudfront.net/68f5030a465a4614ba5ad0d9_1760887644450_450b0abf.webp', excerpt: 'Local entrepreneurs share concerns and solutions with Sarah in productive dialogue.' },
  { id: 9, title: 'Campaign Surpasses Fundraising Goal', category: 'Press Release', date: 'Sep 25, 2025', image: 'https://d64gsuwffb70l.cloudfront.net/68f5030a465a4614ba5ad0d9_1760887646184_5eee3142.webp', excerpt: 'Grassroots support propels campaign past Q3 target with average donation of $47 from 3,000+ donors.' },
];

const NewsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Press Release', 'Event', 'Endorsement'];

  const filteredNews = filter === 'All' ? newsData : newsData.filter(item => item.category === filter);

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">News & Updates</h2>
          <p className="text-xl text-gray-600">Stay informed about our campaign progress</p>
        </div>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                filter === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-blue-600">{item.category}</span>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <button className="text-blue-600 font-semibold hover:text-blue-800">Read more →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
