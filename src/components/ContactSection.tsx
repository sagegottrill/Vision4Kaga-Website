import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600">Connect with our campaign and share your vision for Kaga</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name *"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email Address *"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <textarea
                placeholder="Your Message *"
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={6}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Send Message
              </button>
              {submitted && (
                <div className="p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
                  Message sent! We'll respond within 24 hours. ✓
                </div>
              )}
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Campaign Headquarters</h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start">
                  <span className="mr-3">📍</span>
                  <span>Benisheikh, Kaga Local Government<br/>Borno State, Nigeria</span>
                </p>
                <p className="flex items-center">
                  <span className="mr-3">📞</span>
                  <span>+234 XXX XXX XXXX</span>
                </p>
                <p className="flex items-center">
                  <span className="mr-3">✉️</span>
                  <span>info@zannahajimi.com</span>
                </p>
                <p className="flex items-center">
                  <span className="mr-3">🕐</span>
                  <span>Mon-Fri: 8am-6pm | Sat: 9am-3pm</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Follow Our Campaign</h3>
              <div className="flex gap-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube', 'TikTok'].map((platform) => (
                  <button
                    key={platform}
                    onClick={() => window.open('#', '_blank')}
                    className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition transform hover:scale-110"
                    title={platform}
                  >
                    {platform[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Media Inquiries</h3>
              <p className="text-gray-700 mb-3">For press and media requests, please contact:</p>
              <p className="font-semibold text-blue-900">press@zannahajimi.com</p>
              <button className="mt-4 text-blue-600 font-semibold hover:text-blue-800">
                Download Strategic Blueprint →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
