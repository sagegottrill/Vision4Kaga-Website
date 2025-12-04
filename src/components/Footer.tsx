import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition">About Zannah</button></li>
              <li><button onClick={() => scrollToSection('platform')} className="text-gray-400 hover:text-white transition">Development Agenda</button></li>
              <li><button onClick={() => scrollToSection('volunteer')} className="text-gray-400 hover:text-white transition">Get Involved</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Get Involved</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('donate')} className="text-gray-400 hover:text-white transition">Support Campaign</button></li>
              <li><button onClick={() => scrollToSection('volunteer')} className="text-gray-400 hover:text-white transition">Volunteer</button></li>
              <li><button className="text-gray-400 hover:text-white transition">Join the Movement</button></li>
              <li><button className="text-gray-400 hover:text-white transition">Share Our Vision</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-3">Subscribe to our newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-l-lg text-gray-900 outline-none"
              />
              <button className="bg-white text-black px-4 py-2 rounded-r-lg hover:bg-gray-200 transition font-semibold">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p className="mb-2">Orivon Edge 2025 all rights reserved</p>
          <div className="flex justify-center gap-6 text-sm">
            <button className="hover:text-white transition">Privacy Policy</button>
            <button className="hover:text-white transition">Terms of Use</button>
            <button className="hover:text-white transition">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
