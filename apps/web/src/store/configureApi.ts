import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export enum EApiTags {
  USER = 'USER',
  AUTH = 'AUTH',
}

export const api = createApi({
  tagTypes: [EApiTags.USER, EApiTags.AUTH],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  endpoints: () => ({}),
})
