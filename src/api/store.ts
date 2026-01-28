import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';
import { authReducer } from './slices/auth.slice';
import { userReducer } from './slices/user.slice';
import { storageReducer } from './slices/storage.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    registration: storageReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (gdm) => gdm().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
