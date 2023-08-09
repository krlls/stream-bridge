import { Api, Success } from 'api-types'

import { api } from '../../store/configureApi.ts'
import { apiPatch } from '../../utils/links.ts'
import { TGetPlaylists } from './types.ts'

export const musicUrl = apiPatch(Api.Music.PREFIX)

export const musicApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPlaylistsByStreaming: build.query<Success<Api.Music.Playlists.Resp>, TGetPlaylists>({
      query: ({ streamingType, ...args }) => ({
        method: 'GET',
        url: musicUrl(Api.Music.Playlists.PATCH, `/${streamingType}`),
        params: args,
      }),
      transformResponse: (response: Success<Api.Music.Playlists.Resp>) => response,
    }),
  }),
  overrideExisting: false,
})

export const { useGetPlaylistsByStreamingQuery } = musicApi
