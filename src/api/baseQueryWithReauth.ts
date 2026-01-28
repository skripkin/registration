import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import type { RootState } from './store';
import { saveAuthToStorage, clearAuthStorage } from './utils/authStorage';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.REACT_APP_API_URL || 'http://localhost:3000',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;

    if (token) headers.set('authorization', `Bearer ${token}`);

    return headers;
  },
});

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && 'status' in result.error && result.error.status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;
    if (!refreshToken) {
      clearAuthStorage();
      return result;
    }

    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh-token', method: 'POST', body: { refreshToken } },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const tokens = refreshResult.data as RefreshResponse;
      saveAuthToStorage({
        user: state.auth.user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      clearAuthStorage();
    }
  }

  return result;
};
