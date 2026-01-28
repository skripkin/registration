import { baseApi } from '../baseApi';
import type { User } from '../types/auth';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => ({
        url: '/users/profile-info',
        method: 'GET',
      }),
      providesTags: [
        { type: 'User' },
        { type: 'Registration' },
        { type: 'updateUser' },
      ],
    }),

    updateUser: builder.mutation<User, User>({
      query: (body) => ({
        url: '/users',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfileQuery, useUpdateUserMutation } = userApi;
