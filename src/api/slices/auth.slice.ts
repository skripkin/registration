import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthResponse } from '../types/auth';
import {
  loadAuthFromStorage,
  saveAuthToStorage,
  clearAuthStorage,
} from '../utils/authStorage';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = loadAuthFromStorage();

interface RTKAction {
  type: string;
  meta?: { arg?: { endpointName?: string } };
}

const isAuthFulfilled = (action: RTKAction): boolean => {
  const endpoint = action.meta?.arg?.endpointName;
  return (
    action.type.endsWith('/fulfilled') &&
    (endpoint === 'login' || endpoint === 'register')
  );
};

const isRefreshFulfilled = (action: RTKAction): boolean => {
  const endpoint = action.meta?.arg?.endpointName;
  return action.type.endsWith('/fulfilled') && endpoint === 'refreshToken';
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      saveAuthToStorage(state);
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      clearAuthStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAuthFulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        saveAuthToStorage(state);
      })
      .addMatcher(isRefreshFulfilled, (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        saveAuthToStorage(state);
      });
  },
});

export const { setTokens, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
