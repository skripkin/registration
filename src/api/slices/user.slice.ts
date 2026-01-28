import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../endpoints/user.api';
import type { User } from '../types/auth';

interface UserState {
  profile: User | null;
  loading: boolean;
}

const initialState: UserState = {
  profile: null,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<User>) {
      state.profile = action.payload;
    },
    clearProfile(state) {
      state.profile = null;
    },
    updateProfile(state, action: PayloadAction<Partial<User>>) {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getProfile.matchFulfilled,
      (state, { payload }) => {
        state.profile = payload;
        state.loading = false;
      },
    );
    builder.addMatcher(userApi.endpoints.getProfile.matchPending, (state) => {
      state.loading = true;
    });
    builder.addMatcher(userApi.endpoints.getProfile.matchRejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setProfile, clearProfile, updateProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;
