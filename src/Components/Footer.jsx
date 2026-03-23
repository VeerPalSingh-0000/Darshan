import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { HeartIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`w-full transition-colors duration-300 ${
        isDarkMode
          ? "bg-black border-t border-slate-900"
          : "bg-white border-t border-slate-100"
      }`}
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className={`text-xl font-serif font-bold ${
              isDarkMode ? "text-amber-300" : "text-amber-600"
            } hover:opacity-70 transition-opacity`}
          >
            Darśana
          </Link>

          {/* Built with Love by Veer Pal Singh - Beautiful */}
          <div className="flex items-center gap-2 group">
            <span
              className={`text-sm font-light tracking-wide ${
                isDarkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Built with
            </span>
            <HeartIcon
              className={`w-4 h-4 transition-all duration-300 group-hover:scale-125 group-hover:animate-pulse ${
                isDarkMode
                  ? "text-rose-400 group-hover:text-rose-300"
                  : "text-rose-500 group-hover:text-rose-600"
              }`}
            />
            <span
              className={`text-sm font-light tracking-wide ${
                isDarkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              by
            </span>
            <span
              className={`text-sm font-semibold bg-gradient-to-r ${
                isDarkMode
                  ? "from-amber-300 via-rose-400 to-amber-300 bg-clip-text text-transparent"
                  : "from-amber-600 via-rose-500 to-amber-600 bg-clip-text text-transparent"
              } group-hover:brightness-110 transition-all duration-300`}
            >
              Veer Pal Singh
            </span>
          </div>

          {/* Copyright */}
          <p
            className={`text-xs tracking-wide ${
              isDarkMode ? "text-slate-600" : "text-slate-500"
            }`}
          >
            &copy; {currentYear} Darshanam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
