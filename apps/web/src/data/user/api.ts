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
    createUser: build.mutation<Success<Api.User.Create.Resp>, Api.User.Create.Req>({
      query: (body) => ({
        method: 'POST',
        url: userUrl(Api.User.Create.URL),
        body,
      }),
      transformResponse: (response: Success<Api.User.Create.Resp>) => response,
      invalidatesTags: [EApiTags.USER, EApiTags.AUTH],
    }),
    updateUser: build.mutation<Success<Api.User.Update.Resp>, Api.User.Update.Req>({
      query: (body) => ({
        method: 'PATCH',
        url: userUrl(Api.User.Update.URL),
        body,
      }),
      transformResponse: (response: Success<Api.User.Update.Resp>) => response,
      invalidatesTags: [EApiTags.USER, EApiTags.AUTH],
    }),
  }),
  overrideExisting: false,
})

export const { useAuthMutation, useGetUserQuery, useCreateUserMutation, useUpdateUserMutation } = userApi
