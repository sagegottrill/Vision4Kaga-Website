import React, { useState } from 'react';

const VolunteerSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', zip: '', skills: [], availability: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const skillOptions = ['Canvassing', 'Phone Banking', 'Social Media', 'Event Planning', 'Graphic Design', 'Data Entry'];

  const handleSkillToggle = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.includes(skill)
        ? formData.skills.filter(s => s !== skill)
        : [...formData.skills, skill]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="volunteer" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Join Our Team</h2>
          <p className="text-xl text-gray-600">
            Volunteers are the heart of our campaign. Sign up to make a difference!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Full Name *"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="email"
              placeholder="Email Address *"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="ZIP Code *"
              required
              value={formData.zip}
              onChange={(e) => setFormData({...formData, zip: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-gray-700">How can you help? (Select all that apply)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={`py-2 px-4 rounded-lg font-medium transition ${
                    formData.skills.includes(skill)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 hover:border-blue-600'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Availability</label>
            <select
              value={formData.availability}
              onChange={(e) => setFormData({...formData, availability: e.target.value})}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select your availability</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="evenings">Evenings</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <textarea
            placeholder="Tell us more about yourself or any questions you have..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={4}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-6"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
          >
            Sign Me Up!
          </button>

          {submitted && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
              Welcome to the team! We'll be in touch soon. 🙌
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default VolunteerSection;
