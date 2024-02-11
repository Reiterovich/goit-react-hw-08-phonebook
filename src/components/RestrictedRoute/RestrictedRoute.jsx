import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthIsLoggenIn } from '../../redux/login/selector';

const RestrictedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggenIn);

  return isLoggedIn ? <Navigate to="/contacts" replace /> : children;
};

export default RestrictedRoute;
