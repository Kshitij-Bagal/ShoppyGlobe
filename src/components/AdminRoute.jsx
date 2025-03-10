import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole'); // Assuming role is stored in localStorage

  // Check if the user is an admin
  if (!token || userRole !== 'admin') {
    // Redirect to login page if not an admin
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
