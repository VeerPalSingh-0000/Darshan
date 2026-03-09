import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import AnimatedCharactersLoginPage from "../Components/ui/animated-characters-login-page";

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

// Helper: wraps a promise with a timeout so loading never gets stuck
const withTimeout = (promise, ms = 15000) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Request timed out. Please try again.")),
        ms,
      ),
    ),
  ]);

const AuthPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setError("");
    setLoading(true);
    try {
      await withTimeout(signInWithEmailAndPassword(auth, email, password));
      navigate("/");
    } catch (err) {
      setError(err.code ? mapFirebaseError(err.code) : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email, password, displayName) => {
    setError("");
    setLoading(true);
    try {
      const userCredential = await withTimeout(
        createUserWithEmailAndPassword(auth, email, password),
      );
      await updateProfile(userCredential.user, { displayName });
      navigate("/");
    } catch (err) {
      setError(err.code ? mapFirebaseError(err.code) : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await withTimeout(signInWithPopup(auth, provider), 30000);
      navigate("/");
    } catch (err) {
      setError(err.code ? mapFirebaseError(err.code) : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedCharactersLoginPage
      onLogin={handleLogin}
      onSignUp={handleSignUp}
      onGoogleSignIn={handleGoogleSignIn}
      isLoading={loading}
      error={error}
    />
  );
};

export default AuthPage;
