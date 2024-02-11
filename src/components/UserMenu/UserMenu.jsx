import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiLogoutUser } from '../../redux/login/login.reducer';
import {
  selectAuthIsLoading,
  selectAuthUserData,
} from '../../redux/login/selector';

const UserMenu = () => {
  const dispatch = useDispatch();
  const hendleLogout = () => dispatch(apiLogoutUser());

  const userData = useSelector(selectAuthUserData);
  const isLoading = useSelector(selectAuthIsLoading);

  const userEmail = userData?.email ?? "Could't get user email!";

  return (
    <div>
      <p>{userEmail}</p>
      <button disabled={isLoading} onClick={hendleLogout} type="button">
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
