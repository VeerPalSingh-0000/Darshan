import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300 border-t border-slate-700">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">
              दर्शन <span className="text-slate-300">Darśana</span>
            </h3>
            <p className="text-sm leading-relaxed">
              An immersive exploration of Indian philosophical traditions, 
              wisdom, and spiritual insights that have guided humanity for millennia.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">ॐ</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-200 mb-4">Philosophy Schools</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/explore/vedanta" className="hover:text-orange-400 transition-colors duration-200">Vedanta</a></li>
              <li><a href="#samkhya" className="hover:text-orange-400 transition-colors duration-200">Sāṅkhya</a></li>
              <li><a href="#yoga" className="hover:text-orange-400 transition-colors duration-200">Yoga</a></li>
              <li><a href="#buddhism" className="hover:text-orange-400 transition-colors duration-200">Buddhism</a></li>
              <li><a href="#jainism" className="hover:text-orange-400 transition-colors duration-200">Jainism</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-200 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#texts" className="hover:text-orange-400 transition-colors duration-200">Sacred Texts</a></li>
              <li><a href="#commentaries" className="hover:text-orange-400 transition-colors duration-200">Commentaries</a></li>
              <li><a href="#scholars" className="hover:text-orange-400 transition-colors duration-200">Scholars</a></li>
              <li><a href="#glossary" className="hover:text-orange-400 transition-colors duration-200">Glossary</a></li>
              <li><a href="#about" className="hover:text-orange-400 transition-colors duration-200">About</a></li>
            </ul>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm">
              &copy; {currentYear} Darśana: An Exploration of Indian Philosophy. All Rights Reserved.
            </p>
            <p className="text-xs mt-1 text-slate-500">
              Preserving ancient wisdom for modern minds
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-slate-500">Crafted with</span>
            <span className="text-red-400">♥</span>
            <span className="text-slate-500">in</span>
            <span className="text-orange-400 font-medium">Jodhpur, Rajasthan</span>
            <span className="text-lg">🇮🇳</span>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-6 pt-4 border-t border-slate-700">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>React</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              <span>Tailwind CSS</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Modern Web Standards</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
