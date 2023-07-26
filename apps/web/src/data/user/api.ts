import { Api, Success } from 'api-types'

import { api } from '../../store/configureApi.ts'
import { apiPatch } from '../../utils/links.ts'

const authUrl = apiPatch(Api.Auth.PREFIX)

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    auth: build.query<string, Api.Auth.Login.Req>({
      query: () => ({
        method: 'POST',
        url: authUrl(Api.Auth.Login.URL),
      }),
      transformResponse: (response: Success<Api.Auth.Login.Resp>) => response.token,
    }),
  }),
  overrideExisting: false,
})

export const { useAuthQuery } = userApi
