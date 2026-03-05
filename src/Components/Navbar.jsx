import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Menu, X, Home, Compass, BookOpen } from "lucide-react";

import darsana from "../assets/Images/darsana.png";
import darsanaDark from "../assets/Images/darsana_dark.png";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import ThemeToggle from "./ThemeToggle";

// A new NavLink component that combines React Router's NavLink with Framer Motion animations
const MotionNavLink = ({
  to,
  label,
  icon: Icon,
  isMobile = false,
  onClick,
}) => (
  <NavLink to={to} onClick={onClick} className="focus:outline-none">
    {({ isActive }) => (
      <motion.div
        className={`
          relative flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors duration-300
          ${isMobile ? "text-lg" : "text-sm"}
          ${
            isActive
              ? "text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isActive && (
          <motion.div
            layoutId={isMobile ? "mobile-active-pill" : "desktop-active-pill"}
            className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg shadow-lg"
            style={{ borderRadius: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-3">
          <Icon size={isMobile ? 20 : 16} />
          <span className="whitespace-nowrap">{label}</span>
        </span>
      </motion.div>
    )}
  </NavLink>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/explore", label: "Philosophy", icon: Compass },
    { to: "/gita", label: "Gītā", icon: BookOpen },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    try {
      navigate("/login");
      await signOut(auth);
      closeMobileMenu();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  // CORRECTED: This component now handles image loading errors gracefully.
  const UserAvatar = ({ className = "w-8 h-8" }) => {
    const fallbackSrc = `https://api.dicebear.com/6.x/initials/svg?seed=${currentUser.email}`;

    const handleImgError = (e) => {
      // If an error occurs, replace the src with the fallback
      if (e.target.src !== fallbackSrc) {
        e.target.src = fallbackSrc;
      }
    };

    return (
      <img
        src={currentUser.photoURL || fallbackSrc}
        alt="User Avatar"
        onError={handleImgError}
        className={`${className} rounded-full`}
      />
    );
  };

  const UserName = () => (
    <span className="font-semibold text-sm pr-2 text-slate-800 dark:text-slate-200">
      {currentUser.displayName || currentUser.email.split("@")[0]}
    </span>
  );

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative  flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center"
                onClick={closeMobileMenu}
              >
                <img
                  src={isDarkMode ? darsanaDark : darsana}
                  alt="Darśana Logo"
                  className="h-30 md:h-30"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
                {navItems.map((item) => (
                  <MotionNavLink key={item.to} {...item} />
                ))}
              </div>
            </nav>

            {/* Right Side: User Info, Theme Toggle and Mobile Menu Button */}
            <div className="flex items-center justify-end gap-4">
              <ThemeToggle />

              {currentUser ? (
                // User Info and Actions (Desktop)
                <div className="hidden sm:flex items-center gap-4">
                  <div className="relative group">
                    <button className="flex items-center gap-2 p-2 rounded-full bg-slate-100 dark:bg-slate-800 focus:outline-none">
                      <UserAvatar />
                      <UserName />
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border dark:border-slate-700 p-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                      <div className="p-2 text-center border-b dark:border-slate-700">
                        <p className="font-bold text-slate-800 dark:text-slate-200">
                          {currentUser.displayName || "User"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {currentUser.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 mt-1 p-2 rounded-md font-semibold text-left text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Login Button (Desktop)
                <div className="hidden sm:block">
                  <NavLink
                    to="/login"
                    className="px-4 py-2 rounded-md text-sm font-medium bg-slate-700 text-white hover:bg-slate-800 transition-colors"
                  >
                    Login
                  </NavLink>
                </div>
              )}

              {/* Mobile Menu Button */}
              <div className="sm:hidden">
                <motion.button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Toggle Menu"
                >
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={isMobileMenuOpen ? "x" : "menu"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMobileMenuOpen ? <X /> : <Menu />}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden fixed top-20 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-slate-200 dark:border-slate-700 z-30"
          >
            <nav className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <MotionNavLink
                  key={item.to}
                  {...item}
                  isMobile={true}
                  onClick={closeMobileMenu}
                />
              ))}

              <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>

              {currentUser ? (
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    {/* CORRECTED: Replaced the old img tag with the new robust UserAvatar component */}
                    <UserAvatar className="w-10 h-10" />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {currentUser.displayName ||
                          currentUser.email.split("@")[0]}
                      </p>
                      <p className="text-xs text-slate-500">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-3 rounded-lg font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <MotionNavLink
                  to="/login"
                  label="Login"
                  icon={LogOut}
                  isMobile={true}
                  onClick={closeMobileMenu}
                />
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
