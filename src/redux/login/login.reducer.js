import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

export const authInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

const setToken = token => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const apiRegisterUser = createAsyncThunk(
  'auth/apiRegisterUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstance.post('/users/signup', formData);
      setToken(data.token);

      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLoginUser = createAsyncThunk(
  'auth/apiLoginUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstance.post('/users/login', formData);
      setToken(data.token);

      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
      console.log(error.message);
    }
  }
);

export const apiRefreshUser = createAsyncThunk(
  'auth/apiRefreshUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;
    if (!token) return thunkApi.rejectWithValue('You dont have a token!');
    try {
      setToken(token);
      const { data } = await authInstance.get('/users/current');
      console.log(data);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: null,
  userData: null,
  isLoggenIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(apiRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggenIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(apiLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggenIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggenIn = true;
        state.userData = action.payload;
      })
      .addMatcher(
        isAnyOf(
          apiRegisterUser.pending,
          apiLoginUser.pending,
          apiRegisterUser.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          apiRegisterUser.rejected,
          apiLoginUser.rejected,
          apiRegisterUser.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

// Генератори екшенів
// export const { filterContacts } = contactsSlice.actions;
// Редюсер слайсу
export const authReducer = authSlice.reducer;
