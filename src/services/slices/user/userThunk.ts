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
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    return response;
  }
);

export const getUserThunk = createAsyncThunk('auth/user', async () => {
  const response = await getUserApi();
  return response;
});

export const forgotPasswordThunk = createAsyncThunk(
  'auth/password-reset',
  async (data: { email: string }) => {
    const response = await forgotPasswordApi(data);
    return response;
  }
);

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    return response;
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'password-reset/reset',
  async (data: { password: string; token: string }) => {
    const response = await resetPasswordApi(data);
    return response;
  }
);

export const updateUserThunk = createAsyncThunk(
  'auth/update',
  async (user: Partial<TRegisterData>) => {
    const response = await updateUserApi(user);
    return response;
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  const response = await logoutApi();
  return response;
});
