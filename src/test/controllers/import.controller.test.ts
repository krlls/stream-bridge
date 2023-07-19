import { expect, test, describe, beforeEach, afterEach } from '@jest/globals'

import { Api } from '../../types/TApi'
import { TestApp } from '../index.test'
import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { authUrl, importUrl, testStreamingDTO, testUserData, userUrl } from '../helpers/test.helpers'
import { controllerContainer } from '../../inversify.config'
import { IStreamingService } from '../../modules/streaming/interfaces/IStreamingService'
import { TYPES } from '../../types/const'
import { IPlaylistService } from '../../modules/music/interfaces/IPlaylistService'

const streamingService = controllerContainer.get<IStreamingService>(TYPES.StreamingService)
const playlistsServise = controllerContainer.get<IPlaylistService>(TYPES.PlaylistService)
describe('Import media controller tests', () => {
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
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  test('Import playlists works', async () => {
    const streamingDTO = testStreamingDTO(currentUser.id)

    await streamingService.createStreaming(streamingDTO)

    const response = await TestApp.post(importUrl(Api.Import.Playlists.URL))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .send({
        streamingType: Api.Streaming.EApiStreamingType.SPOTIFY,
      })

    expect(response.status).toBe(200)
    expect(response.text).toMatchSnapshot()
  })

  test('Import playlists without streaming does not work', async () => {
    const response = await TestApp.post(importUrl(Api.Import.Playlists.URL))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .send({
        streamingType: Api.Streaming.EApiStreamingType.SPOTIFY,
      })

    expect(response.status).toBe(400)
  })

  test('Import tracks by playlist works', async () => {
    const streamingDTO = testStreamingDTO(currentUser.id)
    await streamingService.createStreaming(streamingDTO)

    await TestApp.post(importUrl(Api.Import.Playlists.URL))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .send({
        streamingType: Api.Streaming.EApiStreamingType.SPOTIFY,
      })

    const playlists = (await playlistsServise.getUserPlaylists(currentUser.id)) as any[]

    const playlistsResponse = await TestApp.post(importUrl(Api.Import.Tracks.URL))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .send({
        playlistId: playlists[0].id,
      })

    expect(playlistsResponse.status).toBe(200)
    expect(playlistsResponse.text).toMatchSnapshot()
  })
})
