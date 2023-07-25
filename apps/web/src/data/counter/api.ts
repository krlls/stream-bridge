import { Api, Success } from 'api-types'

import { api } from '../../store/configureApi.ts'
import { apiPatch } from '../../utils/links.ts'

const streamingUrl = apiPatch(Api.Streaming.PREFIX)

export const streamingApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAvailableStreamings: build.query({
      query: () => ({
        method: 'GET',
        url: streamingUrl(Api.Streaming.Available.URL),
      }),
      transformResponse: (response: Success<Api.Streaming.Available.Resp>) => response.items,
    }),
  }),
  overrideExisting: false,
})

export const { useGetAvailableStreamingsQuery } = streamingApi
