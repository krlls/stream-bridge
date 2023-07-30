import { Api, Success } from 'api-types'

import { api, EApiTags } from '../../store/configureApi.ts'
import { apiPatch } from '../../utils/links.ts'

export const authUrl = apiPatch(Api.Auth.PREFIX)
export const userUrl = apiPatch(Api.User.PREFIX)

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    auth: build.mutation<string, Api.Auth.Login.Req>({
      query: (body) => ({
        method: 'POST',
        url: authUrl(Api.Auth.Login.URL),
        body,
      }),
      transformResponse: (response: Success<Api.Auth.Login.Resp>) => response.token,
      invalidatesTags: [EApiTags.USER, EApiTags.AUTH],
    }),

    getUser: build.query<Success<Api.User.GetProfile.Resp>, undefined>({
      query: () => ({
        method: 'GET',
        url: userUrl(Api.User.GetProfile.URL),
      }),
      transformResponse: (response: Success<Api.User.GetProfile.Resp>) => response,
      providesTags: [EApiTags.USER],
    }),
  }),
  overrideExisting: false,
})

export const { useAuthMutation, useGetUserQuery } = userApi
