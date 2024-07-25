import {
  TRegisterData,
  registerUserApi,
  getUserApi,
  loginUserApi,
  TLoginData,
  forgotPasswordApi,
  resetPasswordApi,
  updateUserApi,
  logoutApi
} from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUserThunk = createAsyncThunk(
  'auth/register',
  registerUserApi
);

export const getUserThunk = createAsyncThunk('auth/user', getUserApi);

export const forgotPasswordThunk = createAsyncThunk(
  'auth/password-reset',
  forgotPasswordApi
);

export const loginUserThunk = createAsyncThunk('auth/login', loginUserApi);

export const resetPasswordThunk = createAsyncThunk(
  'password-reset/reset',
  resetPasswordApi
);

export const updateUserThunk = createAsyncThunk('auth/update', updateUserApi);

export const logoutThunk = createAsyncThunk('auth/logout', logoutApi);
