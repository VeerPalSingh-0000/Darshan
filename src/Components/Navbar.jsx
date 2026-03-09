import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  LogOut,
  Menu,
  X,
  Home,
  Compass,
  BookOpen,
  ChevronDown,
  LogIn,
} from "lucide-react";

import darsana from "../assets/Images/darsana.png";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import DarkModeToggle from "./ui/dark-mode-toggle";
import GooeyNav from "./GooeyNav";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/explore", label: "Philosophy", icon: Compass },
  { to: "/gita", label: "Gītā", icon: BookOpen },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      navigate("/login");
      await signOut(auth);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const getInitials = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return currentUser?.email?.[0]?.toUpperCase() || "U";
  };

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_8px_24px_rgba(0,0,0,0.2)]"
            : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl"
        }`}
      >
        {/* Subtle gradient border at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/50 dark:via-slate-600/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="flex items-center gap-2.5 group">
                <img
                  src={darsana}
                  alt="Darśana"
                  className="h-12 md:h-16 w-auto transition-transform duration-300"
                />
              </Link>
            </motion.div>

            {/* Desktop Nav - Center */}
            <nav className="hidden md:flex items-center">
              <GooeyNav
                items={navItems.map((item) => ({
                  href: item.to,
                  label: item.label,
                  icon: item.icon,
                }))}
              />
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2 md:gap-3">
              <DarkModeToggle />

              {/* Desktop User / Login */}
              <div className="hidden md:block">
                {currentUser ? (
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200/80 dark:hover:bg-slate-700/60 transition-colors duration-200 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                      {currentUser.photoURL ? (
                        <img
                          src={currentUser.photoURL}
                          alt=""
                          className="w-8 h-8 rounded-xl object-cover ring-2 ring-violet-500/20"
                          onError={(e) => {
                            e.target.style.display = "none";
                            if (e.target.nextSibling)
                              e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 items-center justify-center text-white text-xs font-bold ${currentUser.photoURL ? "hidden" : "flex"}`}
                      >
                        {getInitials()}
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[100px] truncate">
                        {currentUser.displayName ||
                          currentUser.email?.split("@")[0]}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`text-slate-400 transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </motion.button>

                    <AnimatePresence>
                      {isUserDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                        >
                          <div className="p-4 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                {getInitials()}
                              </div>
                              <div className="overflow-hidden">
                                <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm truncate">
                                  {currentUser.displayName || "User"}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                  {currentUser.email}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                            >
                              <LogOut size={16} />
                              Sign out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-violet-500/25 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-200"
                    >
                      <LogIn size={16} />
                      Login
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle Menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isMobileMenuOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed top-[72px] left-3 right-3 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 md:hidden overflow-hidden"
            >
              <nav className="p-3">
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.to === "/"
                        ? location.pathname === "/"
                        : location.pathname.startsWith(item.to);
                    return (
                      <NavLink key={item.to} to={item.to}>
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              isActive
                                ? "bg-violet-100 dark:bg-violet-500/20"
                                : "bg-slate-100 dark:bg-slate-800"
                            }`}
                          >
                            <Icon size={18} />
                          </div>
                          {item.label}
                          {isActive && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
                          )}
                        </motion.div>
                      </NavLink>
                    );
                  })}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent my-3" />

                {currentUser ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {getInitials()}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm truncate">
                          {currentUser.displayName ||
                            currentUser.email?.split("@")[0]}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-500/10">
                        <LogOut size={18} />
                      </div>
                      Sign out
                    </motion.button>
                  </div>
                ) : (
                  <Link to="/login">
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md shadow-violet-500/25"
                    >
                      <LogIn size={18} />
                      Login
                    </motion.div>
                  </Link>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
