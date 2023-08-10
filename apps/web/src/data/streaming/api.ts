import { Api, Success } from 'api-types'

import { api, EApiTags } from '../../store/configureApi.ts'
import { apiPatch } from '../../utils/links.ts'

export const streamingUrl = apiPatch(Api.Streaming.PREFIX)
export const importUrl = apiPatch(Api.Import.PREFIX)

export const streamingApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAvailableStreamings: build.query({
      query: () => ({
        method: 'GET',
        url: streamingUrl(Api.Streaming.Available.URL),
      }),
      transformResponse: (response: Success<Api.Streaming.Available.Resp>) => response.items,
      providesTags: [EApiTags.STREAMING_LIST],
    }),
    getConnectStreamingLink: build.mutation<string, Api.Streaming.EApiStreamingType>({
      query: (type) => ({
        method: 'GET',
        url: streamingUrl(Api.Streaming.Auth.PATCH, '/', type),
      }),
      transformResponse: (response: Success<Api.Streaming.Auth.Resp>) => response?.url,
      invalidatesTags: [EApiTags.STREAMING_LIST, EApiTags.USER_STREAMINGS],
    }),
    getStreamingList: build.query<Success<Api.Streaming.List.Resp>, void>({
      query: () => ({
        method: 'GET',
        url: streamingUrl(Api.Streaming.List.URL),
      }),
      transformResponse: (response: Success<Api.Streaming.List.Resp>) => response,
      providesTags: [EApiTags.USER_STREAMINGS],
    }),
    importPlaylists: build.mutation<Success<Api.Import.Playlists.Resp>, Api.Import.Playlists.Req>({
      query: (body) => ({
        method: 'POST',
        url: importUrl(Api.Import.Playlists.URL),
        body,
      }),
      transformResponse: (response: Success<Api.Import.Playlists.Resp>) => response,
      invalidatesTags: [EApiTags.PLAYLISTS],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAvailableStreamingsQuery,
  useGetStreamingListQuery,
  useGetConnectStreamingLinkMutation,
  useImportPlaylistsMutation,
} = streamingApi
