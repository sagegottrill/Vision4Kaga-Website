import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-green-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Hon. Zannah Lawan Ajimi</h3>
            <p className="text-blue-200 mb-4">
              Vision for a New Kaga: Advancing Inclusive Development and Accountable Leadership.
            </p>
            <div className="flex gap-3">
              {['F', 'T', 'I', 'L'].map((letter) => (
                <button
                  key={letter}
                  className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('about')} className="text-blue-200 hover:text-white transition">About Zannah</button></li>
              <li><button onClick={() => scrollToSection('platform')} className="text-blue-200 hover:text-white transition">Development Agenda</button></li>
              <li><button onClick={() => scrollToSection('volunteer')} className="text-blue-200 hover:text-white transition">Get Involved</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-blue-200 hover:text-white transition">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Get Involved</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('donate')} className="text-blue-200 hover:text-white transition">Support Campaign</button></li>
              <li><button onClick={() => scrollToSection('volunteer')} className="text-blue-200 hover:text-white transition">Volunteer</button></li>
              <li><button className="text-blue-200 hover:text-white transition">Join the Movement</button></li>
              <li><button className="text-blue-200 hover:text-white transition">Share Our Vision</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Stay Updated</h4>
            <p className="text-blue-200 mb-3">Subscribe to our newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-l-lg text-gray-900 outline-none"
              />
              <button className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-700 transition font-semibold">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 text-center text-blue-200">
          <p className="mb-2">© 2025 Hon. Zannah Lawan Ajimi for Kaga LGA Chairmanship. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm">
            <button className="hover:text-white transition">Privacy Policy</button>
            <button className="hover:text-white transition">Terms of Use</button>
            <button className="hover:text-white transition">Accessibility</button>
          </div>
          <p className="mt-4 text-sm">APC Chairmanship Candidate • Kaga Local Government • Borno State</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
