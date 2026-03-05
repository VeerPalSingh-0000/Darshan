import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile, // <-- Import updateProfile
} from "firebase/auth";
import { auth } from "../firebase";
import darsanaLogo from "../assets/Images/darsana.png"; // Make sure you have a logo asset

// Helper to map Firebase errors to user-friendly messages
const mapFirebaseError = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password. Please try again.";
    case "auth/email-already-in-use":
      return "This email address is already registered.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    default:
      return "An error occurred. Please try again.";
  }
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(""); // <-- State for the user's name
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset fields when toggling
    setError("");
    setEmail("");
    setPassword("");
    setDisplayName("");
  }, [isLogin]);

  const handleAuthAction = async (e) => {
    e.preventDefault();
    if (!isLogin && !displayName) {
      setError("Please enter your full name.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // --- Logic for Creating User with Name ---
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await updateProfile(userCredential.user, {
          displayName: displayName,
        });
      }
      navigate("/");
    } catch (err) {
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -30, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Column: Branding & Welcome Message */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-950 text-center relative transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={darsanaLogo}
            alt="Darśana Logo"
            className="w-24 mx-auto mb-6"
          />
          <h1 className="text-4xl font-serif text-slate-800 dark:text-slate-100 tracking-wider">
            A Gateway to Indian Philosophy
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Embark on a journey of discovery. Log in or sign up to explore the
            profound depths of Darśana.
          </p>
        </motion.div>
        <div className="absolute bottom-4 text-xs text-slate-400">
          © 2025 Darśana Project
        </div>
      </div>

      {/* Right Column: Authentication Form */}
      <div className="flex items-center justify-center min-h-screen w-full bg-[#F8F5F2] dark:bg-slate-950 p-4 transition-colors duration-300">
        <motion.div
          className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border dark:border-slate-800"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-slate-800 dark:text-slate-100">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex border-b-2 border-slate-200 dark:border-slate-800 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 p-3 font-semibold text-center transition-colors ${isLogin ? "text-amber-600 border-b-2 border-amber-600" : "text-slate-500"}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 p-3 font-semibold text-center transition-colors ${!isLogin ? "text-amber-600 border-b-2 border-amber-600" : "text-slate-500"}`}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "signup"}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleAuthAction}
            >
              <div className="space-y-5">
                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        transition: { delay: 0.2 },
                      }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div>
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="e.g., Veerpal Singh"
                          required
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 dark:text-white dark:placeholder-slate-500 focus:outline-none transition"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 dark:text-white dark:placeholder-slate-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength="6"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 dark:text-white dark:placeholder-slate-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-4 text-center font-semibold">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-3 rounded-lg hover:bg-slate-900 dark:hover:bg-white transition-transform active:scale-95 shadow-md disabled:bg-slate-400"
              >
                {loading
                  ? "Processing..."
                  : isLogin
                    ? "Login"
                    : "Create Account"}
              </button>
            </motion.form>
          </AnimatePresence>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-slate-200" />
            <span className="mx-4 text-slate-400 font-semibold text-sm">
              OR
            </span>
            <hr className="flex-grow border-slate-200" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors active:scale-95 shadow-sm disabled:bg-slate-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6.02C43.41 37.01 47 31.17 47 24.55z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6.02c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            Continue with Google
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
