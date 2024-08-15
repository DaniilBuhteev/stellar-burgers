import { userSlice, initialState } from './userSlice';
import {
  loginUserThunk,
  registerUserThunk,
  getUserThunk,
  updateUserThunk,
  logoutThunk
} from './userThunk';

const mockUser = {
  success: true,
  user: {
    email: 'test@test.ru',
    name: 'danya'
  }
};
const mockUpdateUser = {
  email: 'test@test.ru',
  name: 'danya'
};

const mockAuth = {
  success: true,
  refreshToken: 'testRefreshToken',
  accessToken: 'testAccessToken',
  user: {
    email: 'test@test.ru',
    name: 'danya'
  }
};

const mockLogin = {
  email: 'test@test.ru',
  password: '040600'
};

const mockRegister = {
  email: 'test@test.ru',
  name: 'danya',
  password: '040600'
};

describe('userSlice', () => {
  it('test registerUserThunk.pending', () => {
    const action = {
      type: registerUserThunk.pending.type
    };
    const state = userSlice.reducer(initialState, action);
  });

  it('test registerUserThunk.rejected', () => {
    const state = userSlice.reducer(
      initialState,
      registerUserThunk.rejected(
        {
          name: '',
          message: 'error'
        },
        '',
        mockRegister
      )
    );
    expect(state.error).toEqual('error');
  });

  it('test registerUserThunk.fulfilled', () => {
    const state = userSlice.reducer(
      initialState,
      registerUserThunk.fulfilled(mockAuth, '', mockRegister)
    );
    expect(state.user).toEqual(mockUser.user);
    expect(state.isCheck).toBe(true);
  });

  it('test loginUserThunk.pending', () => {
    const action = {
      type: loginUserThunk.pending.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isCheck).toBe(false);
  });

  it('test loginUserThunk.rejected', () => {
    const state = userSlice.reducer(
      initialState,
      loginUserThunk.rejected(
        {
          name: '',
          message: 'error'
        },
        '',
        mockLogin
      )
    );
    expect(state.isCheck).toBe(false);
    expect(state.error).toEqual('error');
  });

  it('test loginUserThunk.fulfilled', () => {
    const state = userSlice.reducer(
      initialState,
      loginUserThunk.fulfilled(mockAuth, '', mockLogin)
    );
    expect(state.user).toEqual(mockUser.user);
    expect(state.isCheck).toBe(true);
  });

  it('test getUserThunk.rejected', () => {
    const state = userSlice.reducer(
      initialState,
      getUserThunk.rejected(
        {
          name: '',
          message: 'error'
        },
        ''
      )
    );
    expect(state.isCheck).toBe(false);
    expect(state.error).toEqual('error');
  });

  it('test getUserThunk.fulfilled', () => {
    const state = userSlice.reducer(
      initialState,
      getUserThunk.fulfilled(mockUser, '')
    );
    expect(state.isCheck).toBe(true);
    expect(state.user).toEqual(mockUser.user);
  });

  it('test updateUserThunk.rejected', () => {
    const state = userSlice.reducer(
      initialState,
      updateUserThunk.rejected(
        {
          name: '',
          message: 'error'
        },
        '',
        mockUpdateUser
      )
    );
    expect(state.isCheck).toBe(false);
    expect(state.error).toEqual('error');
  });

  it('test updateUserThunk.fulfilled', () => {
    const state = userSlice.reducer(
      initialState,
      updateUserThunk.fulfilled(
        {
          ...mockUser,
          user: mockUpdateUser
        },
        '',
        mockUpdateUser
      )
    );
    expect(state.isCheck).toBe(true);
    expect(state.user).toEqual(mockUser.user);
  });

  it('test logoutThunk.fulfilled', () => {
    const state = userSlice.reducer(
      initialState,
      logoutThunk.fulfilled(mockAuth, '')
    );
    expect(state.isCheck).toBe(false);
    expect(state.user).toEqual({
      email: '',
      name: ''
    });
  });
});
