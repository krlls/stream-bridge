import { expect, it, describe, beforeEach, afterEach } from '@jest/globals'
import { Api } from 'api-types'

import { TestApp } from '../index.test'
import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import {
  authUrl,
  importUrl,
  musicUrl,
  PLAYLISTS,
  testPlaylistDTO,
  testStreamingDTO,
  testUserData,
  TRACKS,
  userUrl,
} from '../helpers/test.helpers'
import { appContainer } from '../../inversify.config'
import { IStreamingService } from '../../modules/streaming/interfaces/IStreamingService'
import { TYPES } from '../../types/const'
import { IPlaylistService } from '../../modules/music/interfaces/IPlaylistService'

const streamingService = appContainer.get<IStreamingService>(TYPES.StreamingService)
const playlistsServise = appContainer.get<IPlaylistService>(TYPES.PlaylistService)

describe('Music library media controller tests', () => {
  let testToken: string = ''
  let currentUser = {} as any

  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()

    const userResp = await TestApp.post(userUrl(Api.User.Create.URL)).send(testUserData)
    currentUser = JSON.parse(userResp.text)

    const resp = await TestApp.post(authUrl(Api.Auth.Login.URL)).send({
      login: testUserData.login,
      pass: testUserData.pass,
    })
    testToken = JSON.parse(resp.text).token

    const streamingDTO = testStreamingDTO(currentUser.id)

    await streamingService.createStreaming(streamingDTO)

    await TestApp.post(importUrl(Api.Import.Playlists.URL))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .send({
        streamingType: Api.Streaming.EApiStreamingType.SPOTIFY,
      })

    const playlists = (await playlistsServise.getAllUserPlaylists(currentUser.id)) as any[]

    await TestApp.post(importUrl(Api.Import.Tracks.URL))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .send({
        playlistId: playlists[0].id,
      })
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  it('Get playlists works', async () => {
    const response = await TestApp.get(musicUrl(Api.Music.Playlists.PATCH, '/spotify'))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .query({
        offset: 0,
        limit: 50,
      })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).items).toHaveLength(50)
  })

  it('Get playlist works', async () => {
    const playlistId = 1
    const response = await TestApp.get(musicUrl(Api.Music.Playlist.PATCH, '/', Api.Streaming.EApiStreamingType.SPOTIFY))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .query({
        id: playlistId,
      })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).id).toEqual(playlistId)
  })

  it('Get playlist 404', async () => {
    const playlistId = 1345
    const response = await TestApp.get(musicUrl(Api.Music.Playlist.PATCH, '/', Api.Streaming.EApiStreamingType.SPOTIFY))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .query({
        id: playlistId,
      })

    expect(response.status).toBe(404)
  })

  it('Get playlist 400', async () => {
    const response = await TestApp.get(
      musicUrl(Api.Music.Playlist.PATCH, '/', Api.Streaming.EApiStreamingType.SPOTIFY),
    ).set({
      Authorization: `Bearer ${testToken}`,
    })

    expect(response.status).toBe(400)
  })

  it('Get tracks works', async () => {
    const response = await TestApp.get(musicUrl(Api.Music.Tracks.PATCH, '/spotify'))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .query({
        playlistId: 1,
        offset: 0,
        limit: 50,
      })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).items).toHaveLength(50)
  })

  it('Get playlists with pagination works', async () => {
    const limit = 10
    let offset = 0
    let tracks: any[] = []

    while ((!tracks.length && !offset) || tracks.length % limit === 0) {
      const response = await TestApp.get(musicUrl(Api.Music.Playlists.PATCH, '/spotify'))
        .set({
          Authorization: `Bearer ${testToken}`,
        })
        .query({
          offset,
          limit,
        })

      const newTracks = JSON.parse(response.text)

      if (newTracks.items.length === 0) {
        break
      }

      tracks = [...tracks, ...newTracks.items]

      expect(response.status).toBe(200)
      offset += limit
    }

    expect(tracks).toHaveLength(PLAYLISTS)
  })

  it('Get tracks with pagination works', async () => {
    const limit = 50
    let offset = 0
    let tracks: any[] = []

    while ((!tracks.length && !offset) || tracks.length % limit === 0) {
      const response = await TestApp.get(musicUrl(Api.Music.Tracks.PATCH, '/spotify'))
        .set({
          Authorization: `Bearer ${testToken}`,
        })
        .query({
          playlistId: 1,
          offset,
          limit,
        })

      const newTracks = JSON.parse(response.text)

      if (newTracks.items.length === 0) {
        break
      }

      tracks = [...tracks, ...newTracks.items]

      expect(response.status).toBe(200)
      offset += limit
    }

    expect(tracks).toHaveLength(TRACKS)
  })

  it('Get playlists error 400', async () => {
    const response = await TestApp.get(musicUrl(Api.Music.Playlists.PATCH, '/spotify'))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .query({
        offset: 0,
        limit: 500,
      })

    expect(response.status).toBe(400)
  })

  it('Get tracks error 400', async () => {
    const response = await TestApp.get(musicUrl(Api.Music.Tracks.PATCH, '/spotify'))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .query({
        playlistId: 13242343,
        limit: 500,
      })

    expect(response.status).toBe(400)
  })

  it('Get playlist not found', async () => {
    const response = await TestApp.get(musicUrl(Api.Music.Tracks.PATCH, '/spotify'))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .query({
        playlistId: 4738247,
        limit: 50,
      })

    expect(response.status).toBe(400)
  })

  it('Get playlist error 400 with empty query', async () => {
    const response = await TestApp.get(musicUrl(Api.Music.Tracks.PATCH, '/spotify')).set({
      Authorization: `Bearer ${testToken}`,
    })

    expect(response.status).toBe(400)
  })

  it('Get tracks error 400 with empty query', async () => {
    const response = await TestApp.get(musicUrl(Api.Music.Tracks.PATCH, '/spotify')).set({
      Authorization: `Bearer ${testToken}`,
    })

    expect(response.status).toBe(400)
  })

  it('Get tracks by empty playlist', async () => {
    const playlist = (await playlistsServise.createPlayList(testPlaylistDTO(currentUser.is, 1))) as any
    const response = await TestApp.get(musicUrl(Api.Music.Tracks.PATCH, '/spotify'))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .query({
        playlistId: playlist.id,
        offset: 0,
        limit: 50,
      })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toHaveProperty('items', [])
  })
})
