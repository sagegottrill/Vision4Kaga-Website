import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

const DonateSection: React.FC = () => {
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', zip: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const presetAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const selectedAmount = customAmount ? parseFloat(customAmount) : amount;

    try {
      const { error: supabaseError } = await supabase
        .from('donations')
        .insert([{
          name: formData.name,
          email: formData.email,
          ward_community: formData.zip,
          amount: selectedAmount,
          is_recurring: isRecurring
        }]);

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
      setFormData({ name: '', email: '', zip: '' });
      setCustomAmount('');
      
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to process donation. Please try again.');
      console.error('Error submitting donation:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedAmount = customAmount ? parseFloat(customAmount) : amount;

  return (
    <section id="donate" className="py-20 bg-gradient-to-r from-blue-900 to-green-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Support Our Campaign</h2>
          <p className="text-xl text-blue-100">
            Your contribution helps us implement our strategic blueprint for Kaga's transformation
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 text-gray-900">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 mb-6 text-center">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Select Amount</label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => { setAmount(preset); setCustomAmount(''); }}
                    className={`py-3 rounded-lg font-semibold transition ${
                      amount === preset && !customAmount
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    ₦{preset.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Other amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span className="ml-3 font-semibold">Make this a monthly recurring donation</span>
              </label>
            </div>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Ward/Community"
                required
                value={formData.zip}
                onChange={(e) => setFormData({...formData, zip: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : `Support Campaign ₦${(customAmount ? parseFloat(customAmount) : amount).toLocaleString()}${isRecurring ? '/month' : ''}`}
            </button>

            {submitted && (
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
                Thank you for your support! 🎉
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
