import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import {
  loginUserThunk,
  registerUserThunk,
  getUserThunk,
  updateUserThunk,
  logoutThunk
} from './userThunk';

interface isAuthState {
  user: TUser | null;
  isLoading: boolean;
  isCheck: boolean;
  error: string | undefined;
}

export const initialState: isAuthState = {
  user: null,
  isLoading: false,
  isCheck: false,
  error: undefined
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
        state.error = undefined;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isCheck = true;
        state.error = undefined;
      })
      //LOGIN
      .addCase(loginUserThunk.pending, (state) => {
        state.isCheck = false;
        state.error = undefined;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isCheck = false;
        state.error = action.error.message;
      })

      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isCheck = true;
        state.error = undefined;
      })
      //USER
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isCheck = false;
        state.error = action.error.message;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isCheck = true;
        state.user = action.payload.user;
      })
      //UPDATE
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isCheck = false;
        state.error = action.error.message;
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
