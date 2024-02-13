import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiLogoutUser } from '../../redux/login/login.reducer';
import {
  selectAuthIsLoading,
  selectAuthUserData,
} from '../../redux/login/selector';
import { TitleUserEmail, UserContainer } from './UserMenu.styled.components';

const UserMenu = () => {
  const dispatch = useDispatch();
  const hendleLogout = () => dispatch(apiLogoutUser());

  const userData = useSelector(selectAuthUserData);
  const isLoading = useSelector(selectAuthIsLoading);

  const userEmail = userData?.email ?? "Could't get user email!";

  return (
    <UserContainer>
      <TitleUserEmail>{userEmail}</TitleUserEmail>
      <button disabled={isLoading} onClick={hendleLogout} type="button">
        Logout
      </button>
    </UserContainer>
  );
};

export default UserMenu;
