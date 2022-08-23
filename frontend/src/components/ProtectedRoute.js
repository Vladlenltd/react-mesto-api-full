import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLogIn, children }) => {
  return isLogIn ? children : <Navigate to='/sign-in' />;
};

export default ProtectedRoute;