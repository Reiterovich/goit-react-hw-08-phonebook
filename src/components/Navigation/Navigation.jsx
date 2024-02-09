import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectAuthIsLoggenIn } from '../../redux/login/selector';

const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggenIn);

  return (
    <div>
      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/contacts">Contacts</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/registration">Registration</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
