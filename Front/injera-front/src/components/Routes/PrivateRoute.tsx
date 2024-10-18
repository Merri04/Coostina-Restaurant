import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  // No need for component or element, just check for children
}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />; // If authenticated, render the children (Outlet)
};

export default PrivateRoute;
