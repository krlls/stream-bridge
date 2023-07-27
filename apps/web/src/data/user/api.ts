import { Api, Success } from 'api-types'

import { api, EApiTags } from '../../store/configureApi.ts'
import { apiPatch } from '../../utils/links.ts'

const authUrl = apiPatch(Api.Auth.PREFIX)

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
  }),
  overrideExisting: false,
})

export const { useAuthMutation } = userApi
