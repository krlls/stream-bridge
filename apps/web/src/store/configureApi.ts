import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { RootState } from './configureStore.ts'

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  { maxRetries: 2 },
)

const baseQueryWithHandlers: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions)

  if (!result.error) {
    return result
  }

  const error = {
    status:
      typeof result.error.status === 'number'
        ? result.error.status
        : (result.error.status === 'PARSING_ERROR' && result.error.originalStatus) || result.error.status,
    error: result.error,
  }

  if (error.status === 401) {
    api.dispatch({ payload: undefined, type: 'user/resetToken' })

    return result
  }

  return result
}

export enum EApiTags {
  USER = 'USER',
  AUTH = 'AUTH',
  STREAMING = 'STREAMING',
}

export const api = createApi({
  tagTypes: [EApiTags.USER, EApiTags.AUTH, EApiTags.STREAMING],
  baseQuery: baseQueryWithHandlers,
  endpoints: () => ({}),
})
