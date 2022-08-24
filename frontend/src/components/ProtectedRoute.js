import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLogIn, children }) => {
  return isLogIn ? children : <Navigate to='/signin' />;
};

export default ProtectedRoute;