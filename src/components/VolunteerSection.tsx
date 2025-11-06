import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

const VolunteerSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', state: '', lga: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('volunteers')
        .insert([formData]);

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', state: '', lga: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.');
      console.error('Error submitting volunteer form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="volunteer" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-blue-900 mb-4">Join Our Team</h2>
          <p className="text-xl text-gray-600">
            Volunteers are the heart of our campaign. Sign up to make a difference!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-8">
          {error && (
            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 mb-6 text-center">
              <p className="text-red-700">{error}</p>
            </div>
          )}
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

          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
          />

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Local Government Area (LGA)"
              value={formData.lga}
              onChange={(e) => setFormData({...formData, lga: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
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
            disabled={isSubmitting}
            className="w-full bg-blue-900 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Sign Me Up!'}
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
