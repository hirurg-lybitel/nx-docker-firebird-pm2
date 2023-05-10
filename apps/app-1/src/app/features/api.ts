import { config } from '@nx-docker-firebird-pm2/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `http://${config.host}:${config.serverPort}/`;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
  endpoints: (builder) => ({
    getUsersCount: builder.query<{ NUMBER: number }, void>({
      query: () => 'usersCount',
      transformResponse: async (response: any) => await response.result,
    })
  })
});

export const {
  useGetUsersCountQuery
} = api;
