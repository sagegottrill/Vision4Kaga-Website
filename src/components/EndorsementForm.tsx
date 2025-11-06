import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

const EndorsementForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    location: '',
    content: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Insert endorsement into Supabase
      const { data, error: supabaseError } = await supabase
        .from('endorsements')
        .insert([
          {
            name: formData.name,
            title: formData.title,
            location: formData.location,
            content: formData.content,
            email: formData.email,
            status: 'pending'
          }
        ])
        .select();

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
      setFormData({ name: '', title: '', location: '', content: '', email: '' });
      
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit endorsement. Please try again.');
      console.error('Error submitting endorsement:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="endorsement" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-blue-900 mb-4">
            Share Your Endorsement
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join community leaders in supporting our vision for a better Kaga. Your voice matters!
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
            <div className="text-green-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h3>
            <p className="text-green-700">
              Your endorsement has been submitted and is awaiting approval. We appreciate your support!
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 mb-6 text-center">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            <div className="bg-white rounded-xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Title/Position *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g., Community Leader"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Your ward/community"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Endorsement *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Share why you support Hon. Zannah Lawan Ajimi's vision for Kaga..."
                />
                <p className="text-sm text-gray-500 mt-2">
                  Minimum 50 characters. Your endorsement will be reviewed before being published.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || formData.content.length < 50}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Endorsement'}
              </button>
            </form>
          </div>
          </>
        )}
      </div>
    </section>
  );
};

export default EndorsementForm;
