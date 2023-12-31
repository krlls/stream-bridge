import { Api, Success } from 'api-types'

import { api, EApiTags } from '../../store/configureApi.ts'
import { apiPatch } from '../../utils/links.ts'
import { TGetPlaylists } from './types.ts'

export const musicUrl = apiPatch(Api.Music.PREFIX)

export const musicApi = api.injectEndpoints({
  endpoints: ({ query }) => ({
    getPlaylistsByStreaming: query<Success<Api.Music.Playlists.Resp>, TGetPlaylists>({
      query: ({ streamingType, ...args }) => ({
        method: 'GET',
        url: musicUrl(Api.Music.Playlists.PATCH, `/${streamingType}`),
        params: args,
      }),
      transformResponse: (response: Success<Api.Music.Playlists.Resp>) => response,
      providesTags: [EApiTags.PLAYLISTS],
    }),
    getPlaylistById: query<
      Success<Api.Music.Playlist.Resp>,
      Api.Music.Playlist.Req & { streamingType: Api.Streaming.EApiStreamingType }
    >({
      query: ({ streamingType, ...args }) => ({
        method: 'GET',
        url: musicUrl(Api.Music.Playlist.PATCH, `/${streamingType}`),
        params: args,
      }),
      transformResponse: (response: Success<Api.Music.Playlist.Resp>) => response,
      providesTags: [EApiTags.PLAYLISTS],
    }),
    getTracksByPlaylist: query<
      Success<Api.Music.Tracks.Resp>,
      Api.Music.Tracks.Req & { streamingType: Api.Streaming.EApiStreamingType }
    >({
      query: ({ streamingType, ...params }) => ({
        method: 'GET',
        url: musicUrl(Api.Music.Tracks.PATCH, '/', streamingType),
        params,
      }),
      merge: (currentCache, newItems) => {
        ;(currentCache.items || []).push(...(newItems?.items || []))
      },
      providesTags: [EApiTags.TRACKS],
    }),
  }),
  overrideExisting: false,
})

export const { useGetPlaylistsByStreamingQuery, useGetTracksByPlaylistQuery, useGetPlaylistByIdQuery } = musicApi
