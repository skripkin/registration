import { baseApi } from '../baseApi';
import type {
  LoginRequest,
  AuthResponse,
  RefreshTokenRequest,
  VerifyPhoneResponse,
  VerifyPhoneRequest,
} from '../types/auth';
import type { RegistrationData } from '../types/registration';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
    register: builder.mutation<AuthResponse, RegistrationData>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
    }),
    refreshToken: builder.mutation<
      Pick<AuthResponse, 'accessToken' | 'refreshToken'>,
      RefreshTokenRequest
    >({
      query: (body) => ({ url: '/auth/refresh-token', method: 'POST', body }),
    }),
    verifyPhone: builder.mutation<VerifyPhoneResponse, VerifyPhoneRequest>({
      query: (body) => ({
        url: '/auth/phone/verify',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useVerifyPhoneMutation,
} = authApi;
