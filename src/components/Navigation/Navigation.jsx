import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectAuthIsLoggenIn } from '../../redux/login/selector';
import { ContainerNav, Listlink } from './Navigation.styled.components';

const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggenIn);

  return (
    <ContainerNav>
      <Listlink>
        <li>
          <NavLink to="/">Home Page</NavLink>
        </li>
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
      </Listlink>
    </ContainerNav>
  );
};

export default Navigation;
