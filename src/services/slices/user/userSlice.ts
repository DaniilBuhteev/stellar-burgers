import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import {
  loginUserThunk,
  registerUserThunk,
  getUserThunk,
  updateUserThunk,
  forgotPasswordThunk,
  logoutThunk,
  resetPasswordThunk
} from './userThunk';

interface isAuthState {
  user: TUser | null;
  isLoading: boolean;
  isCheck: boolean;
  error: SerializedError | null;
}

const initialState: isAuthState = {
  user: null,
  isLoading: false,
  isCheck: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectUserIsLoading: (state) => state.isLoading,
    selectUserIsCheck: (state) => state.isCheck
  },
  extraReducers: (builder) => {
    builder
      //REGISTER
      .addCase(registerUserThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isCheck = true;
        state.error = null;
      })
      //LOGIN
      .addCase(loginUserThunk.pending, (state) => {
        state.isCheck = false;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isCheck = false;
        state.error = action.error;
      })

      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isCheck = true;
        state.error = null;
      })
      //USER
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isCheck = false;
        state.error = action.error;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isCheck = true;
        state.user = action.payload.user;
      })
      //UPDATE
      .addCase(updateUserThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isCheck = false;
        state.error = action.error;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isCheck = true;
        state.user = action.payload.user;
      })
      //LOGOUT
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isCheck = false;
        state.user = { email: '', name: '' };
      });
  }
});

export const { selectUser, selectUserIsLoading, selectUserIsCheck } =
  userSlice.selectors;
export default userSlice.reducer;
