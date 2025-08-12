import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If user is not logged in, redirect them to the login page
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the component they are trying to access
  return children;
};

export default ProtectedRoute;
