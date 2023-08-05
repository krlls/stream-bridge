import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { RootState } from './configureStore.ts'
import { API_URL } from '../const.ts'
import { parseErrorStatus } from '../utils/api.ts'

const baseQuery = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: API_URL,
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user.token

        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }

        return headers
      },
    })(args, api, extraOptions)

    const error = parseErrorStatus(result)

    if (error === 401 || error === 403) {
      retry.fail(result.error)
    }

    return result
  },
  {
    maxRetries: 5,
  },
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
    status: parseErrorStatus(result),
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
