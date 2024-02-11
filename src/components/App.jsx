import { Route, Routes } from 'react-router-dom';
import RegisterPage from 'pages/registerPage';
import ContactsPage from 'pages/contactsPage';
import LoginPage from 'pages/loginPage';
import Navigation from './Navigation/Navigation';
import UserMenu from './UserMenu/UserMenu';
import { selectAuthIsLoggenIn } from '../redux/login/selector';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { apiRefreshUser } from '../redux/login/login.reducer';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';

export const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectAuthIsLoggenIn);

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>

      <header>
        <Navigation />
        {isLoggedIn && <UserMenu />}
      </header>

      {/* <HomePage /> */}
      <Routes>
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <ContactsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <LoginPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <RestrictedRoute>
              <RegisterPage />
            </RestrictedRoute>
          }
        />
      </Routes>
    </>
  );
};
