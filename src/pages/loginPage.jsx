import React from 'react';
import { useDispatch } from 'react-redux';
import { apiLoginUser } from '../redux/login/login.reducer';

const LoginPage = () => {
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;

    const formData = {
      email,
      password,
    };
    console.log(formData);
    dispatch(apiLoginUser(formData));
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="userEmail"
            placeholder="name@mail.com"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            required
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
