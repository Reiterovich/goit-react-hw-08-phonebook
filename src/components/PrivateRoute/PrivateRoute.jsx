import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthIsLoggenIn } from '../../redux/login/selector';

const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggenIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
