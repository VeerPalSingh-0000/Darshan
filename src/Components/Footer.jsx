import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl transition-colors duration-500 overflow-hidden">
      {/* Aesthetic Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 dark:via-indigo-500/50 to-transparent"></div>

      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 dark:bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link
              to="/"
              className="font-serif text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-400 hover:opacity-80 transition-opacity"
            >
              Darśana
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">
              &copy; {currentYear} All Rights Reserved
            </p>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            {["About", "Gītā", "Schools"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase() === "schools" ? "explore" : item.toLowerCase()}`}
                className="group relative text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:text-amber-600 dark:hover:text-amber-400"
              >
                {item}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-amber-500 dark:bg-amber-400 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out rounded-full"></span>
              </Link>
            ))}
          </nav>

          {/* Signature */}
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-full border border-slate-200/50 dark:border-slate-800/50 shadow-sm backdrop-blur-sm">
            <span>Crafted by</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mx-1.5">
              Veer Pal Singh
            </span>
            <span>with</span>
            <span
              className="text-red-500 hover:text-red-600 dark:text-red-400 mx-1.5 animate-pulse cursor-default"
              title="Love"
            >
              ♥
            </span>
            <span>in</span>
            <span className="text-amber-600 dark:text-amber-400 font-medium ml-1.5 mr-1">
              Jodhpur, Rajasthan
            </span>
            <span className="text-base select-none">🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
