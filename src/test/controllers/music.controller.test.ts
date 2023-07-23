import { expect, test, describe, beforeEach, afterEach } from '@jest/globals'

import { Api } from '../../types/TApi'
import { TestApp } from '../index.test'
import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import {
  authUrl,
  importUrl,
  musicUrl,
  PLAYLISTS,
  testStreamingDTO,
  testUserData,
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

  test('Get playlists works', async () => {
    const response = await TestApp.get(musicUrl(Api.Music.Playlists.PATCH, '/spotify'))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .query({
        offset: 0,
        limit: 50,
      })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).items).toHaveLength(PLAYLISTS)
  })

  test('Get playlists works', async () => {
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
})