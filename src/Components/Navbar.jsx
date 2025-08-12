import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import darsana from '../assets/Images/darsana.png'; // Make sure this path is correct

// Import auth context and firebase services
import { useAuth } from '../context/AuthContext'; // Adjust path if needed
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust path if needed

/* ---------- NavLink wrapper with corrected hover effect ---------- */
const NavLinkWrapper = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `group relative text-lg font-medium transition-colors duration-300 ease-in-out
      ${isActive ? "text-violet-800" : "text-slate-900 hover:text-violet-800"}`
    }
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-violet-500 scale-x-0 transition-transform origin-center group-hover:scale-x-100" />
  </NavLink>
);

/* ---------- Navbar ---------- */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser } = useAuth(); // Get user state from context
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMobileMenuOpen(false); // Close mobile menu on logout
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* Background layer */}
      <div className="absolute inset-0 bg-gray-200/40 backdrop-blur-md shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)] pointer-events-none" />
      
      {/* Content layer */}
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* --- Logo --- */}
            <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <img src={darsana} alt="Darśana Logo" className="h-30" /> {/* Adjusted height */}
            </Link>

            {/* --- Desktop Navigation --- */} 
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <NavLinkWrapper to="/">Home</NavLinkWrapper>
              <NavLinkWrapper to="/explore">Explore</NavLinkWrapper>
              <NavLinkWrapper to="/gita">Gītā</NavLinkWrapper>
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-lg font-medium bg-slate-700 text-white hover:bg-slate-800 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <NavLinkWrapper to="/login">Login</NavLinkWrapper>
              )}
            </div>

            {/* --- Mobile Menu Button --- */}
            <button 
              onClick={toggleMobileMenu}
              className="sm:hidden text-slate-900 hover:text-violet-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
              </svg>
            </button>
          </div>
        </div>

        {/* --- Mobile Menu --- */}
        {isMobileMenuOpen && (
          <div className="sm:hidden absolute w-full bg-violet-100/95 backdrop-blur-md shadow-lg">
            <div className="flex flex-col items-center space-y-6 py-8">
              <NavLinkWrapper to="/" onClick={toggleMobileMenu}>Home</NavLinkWrapper>
              <NavLinkWrapper to="/explore" onClick={toggleMobileMenu}>Explore</NavLinkWrapper>
              <NavLinkWrapper to="/gita" onClick={toggleMobileMenu}>Gītā</NavLinkWrapper>
              <div className="w-1/2 border-t border-violet-300 my-2" />
              {currentUser ? (
                 <button
                    onClick={handleLogout}
                    className="px-6 py-3 rounded-md text-lg font-medium bg-slate-700 text-white hover:bg-slate-800 transition-colors w-4/5 text-center"
                  >
                    Logout
                  </button>
              ) : (
                <NavLinkWrapper to="/login" onClick={toggleMobileMenu}>Login</NavLinkWrapper>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
