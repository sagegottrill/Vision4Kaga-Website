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
    <section id="volunteer" className="py-24 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
          alt="Volunteers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Join Our Team</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Be part of the movement. Your time and skills can help shape the future of Kaga.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center">
                <p className="text-red-100">{error}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-100 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-white placeholder-blue-200/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-100 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-white placeholder-blue-200/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-100 ml-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-white placeholder-blue-200/50 transition-all"
                placeholder="+234..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-100 ml-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-white placeholder-blue-200/50 transition-all"
                  placeholder="Borno"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-100 ml-1">LGA</label>
                <input
                  type="text"
                  value={formData.lga}
                  onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-white placeholder-blue-200/50 transition-all"
                  placeholder="Kaga"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-100 ml-1">How would you like to help?</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-white placeholder-blue-200/50 transition-all resize-none"
                placeholder="Tell us about your skills and interests..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-500 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Sign Me Up!'}
            </button>

            {submitted && (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-center">
                <p className="text-green-100 font-medium">Welcome to the team! We'll be in touch soon. 🙌</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
