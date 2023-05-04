import { config } from '@nx-docker-firebird-pm2/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `http://${config.host}:${config.serverPort}/`;

console.log('baseUrl', baseUrl);
console.log('process.env', process.env.NODE_ENV, process.env.NX_HOST_IP, process.env.NX_SERVER_PORT, process.env.NX_DEV_SERVER_PORT);

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
