import { Api } from 'api-types'
import { expect } from '@jest/globals'

import { TestApp } from '../index.test'
import { importUrl, musicUrl, streamingUrl, userUrl } from './test.helpers'

export const testsWithToken =
  (token: string, expectStatus = 401) =>
  async () => {
    const auth = {
      Authorization: `Bearer ${token}`,
    }

    const resp = await Promise.all([
      await TestApp.post(importUrl(Api.Import.Playlists.URL)).set(auth),
      await TestApp.post(importUrl(Api.Import.Tracks.URL)).set(auth),
      await TestApp.get(musicUrl(Api.Music.Playlist.PATCH, '/', Api.Streaming.EApiStreamingType.SPOTIFY)).set(auth),
      await TestApp.get(musicUrl(Api.Music.Tracks.PATCH, '/', Api.Streaming.EApiStreamingType.SPOTIFY)).set(auth),
      await TestApp.get(streamingUrl(Api.Streaming.Auth.PATCH, '/', Api.Streaming.EApiStreamingType.SPOTIFY)).set(auth),
      await TestApp.get(streamingUrl(Api.Streaming.List.URL)).set(auth),
      await TestApp.get(streamingUrl(Api.Streaming.Available.URL)).set(auth),
      await TestApp.delete(streamingUrl(Api.Streaming.Delete.PATCH, '/', Api.Streaming.EApiStreamingType.SPOTIFY)).set(
        auth,
      ),
      await TestApp.get(userUrl(Api.User.GetProfile.URL)).set(auth),
    ])

    expect(resp.every((r) => r.status === expectStatus)).toBe(true)
  }
