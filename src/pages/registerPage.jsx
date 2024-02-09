import React from 'react';
import { useDispatch } from 'react-redux';
import { apiRegisterUser } from '../redux/login/login.reducer';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    const name = e.currentTarget.elements.userName.value;
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;

    const formData = {
      name,
      email,
      password,
    };
    console.log(formData);
    dispatch(apiRegisterUser(formData));
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="userName"
            placeholder="Name"
            minLength={2}
            required
          />
        </label>
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
            placeholder="Minimum of 7 characters."
            minLength={7}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterPage;
