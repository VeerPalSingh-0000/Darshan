import React from "react";
import { Link } from "react-router-dom"; // Import Link for client-side routing

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300 border-t border-slate-700">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section (spans 2 columns on md, 1 on lg) */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">
              दर्शन <span className="text-slate-300">Darśana</span>
            </h3>
            <p className="text-sm leading-relaxed">
              An immersive exploration of Indian philosophical traditions,
              wisdom, and spiritual insights that have guided humanity for
              millennia.
            </p>
            <div className="flex space-x-4 pt-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">ॐ</span>
              </div>
            </div>
          </div>

          {/* Philosophy Schools */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-200 mb-4">
              Philosophy Schools
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/schools/vedanta" className="hover:text-orange-400 transition-colors duration-200">Vedānta</Link></li>
              <li><Link to="/schools/samkhya" className="hover:text-orange-400 transition-colors duration-200">Sāṃkhya</Link></li>
              <li><Link to="/schools/yoga" className="hover:text-orange-400 transition-colors duration-200">Yoga</Link></li>
              <li><Link to="/schools/nyaya" className="hover:text-orange-400 transition-colors duration-200">Nyāya</Link></li>
              <li><Link to="/schools/vaisesika" className="hover:text-orange-400 transition-colors duration-200">Vaiśeṣika</Link></li>
              <li><Link to="/schools/mimamsa" className="hover:text-orange-400 transition-colors duration-200">Mīmāṃsā</Link></li>
              <li><Link to="/schools/jainism" className="hover:text-orange-400 transition-colors duration-200">Jainism</Link></li>
              <li><Link to="/schools/buddhism" className="hover:text-orange-400 transition-colors duration-200">Buddhism</Link></li>
              <li><Link to="/schools/carvaka" className="hover:text-orange-400 transition-colors duration-200">Cārvāka</Link></li>
            </ul>
          </div>

          {/* Bhagavad Gītā Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-200 mb-4">
              Bhagavad Gītā
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/gita" className="hover:text-orange-400 transition-colors duration-200">Gītā Home</Link></li>
              <li><Link to="/gita/chapters" className="hover:text-orange-400 transition-colors duration-200">All Chapters</Link></li>
              <li><Link to="/gita/verses" className="hover:text-orange-400 transition-colors duration-200">Key Verses</Link></li>
              <li><Link to="/gita/guide" className="hover:text-orange-400 transition-colors duration-200">Study Guide</Link></li>
              <li><Link to="/gita/resources" className="hover:text-orange-400 transition-colors duration-200">Resources</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-200 mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources/sacred-texts" className="hover:text-orange-400 transition-colors duration-200">Sacred Texts</Link></li>
              <li><Link to="/resources/commentaries" className="hover:text-orange-400 transition-colors duration-200">Commentaries</Link></li>
              <li><Link to="/resources/scholars" className="hover:text-orange-400 transition-colors duration-200">Scholars</Link></li>
              <li><Link to="/resources/glossary" className="hover:text-orange-400 transition-colors duration-200">Glossary</Link></li>
              <li><Link to="/about" className="hover:text-orange-400 transition-colors duration-200">About</Link></li>
            </ul>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm">
              &copy; {currentYear} Darśana: An Exploration of Indian Philosophy.
              All Rights Reserved.
            </p>
            <p className="text-xs mt-1 text-slate-500">
              Preserving ancient wisdom for modern minds
            </p>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <span className="text-slate-500">Crafted with</span>
            <span className="text-red-400">♥</span>
            <span className="text-slate-500">in</span>
            <span className="text-orange-400 font-medium">
              Jodhpur, Rajasthan
            </span>
            <span className="text-lg">🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
