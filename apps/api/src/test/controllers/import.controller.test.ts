import { expect, it, describe, beforeEach, afterEach } from '@jest/globals'
import { Api } from 'api-types'

import { TestApp } from '../index.test'
import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { authUrl, importUrl, PLAYLISTS, testStreamingDTO, testUserData, TRACKS, userUrl } from '../helpers/test.helpers'
import { appContainer } from '../../inversify.config'
import { IStreamingService } from '../../modules/streaming/interfaces/IStreamingService'
import { TYPES } from '../../types/const'
import { IPlaylistService } from '../../modules/music/interfaces/IPlaylistService'

describe('Import media controller tests', () => {
  let testToken: string = ''
  let currentUser = {} as any
  let streamingService: IStreamingService
  let playlistsServise: IPlaylistService

  beforeEach(async () => {
    streamingService = appContainer.get<IStreamingService>(TYPES.StreamingService)
    playlistsServise = appContainer.get<IPlaylistService>(TYPES.PlaylistService)

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

  it('Import playlists works', async () => {
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

  it('Import playlists without streaming does not work', async () => {
    const response = await TestApp.post(importUrl(Api.Import.Playlists.URL))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .send({
        streamingType: Api.Streaming.EApiStreamingType.SPOTIFY,
      })

    expect(response.status).toBe(400)
  })

  it('Import tracks by playlist works', async () => {
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

  it('Import all media works', async () => {
    const streamingDTO = testStreamingDTO(currentUser.id)
    await streamingService.createStreaming(streamingDTO)

    const resp = await TestApp.post(importUrl(Api.Import.Lib.URL))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .send({
        streamingType: Api.Streaming.EApiStreamingType.SPOTIFY,
      })

    expect(resp.status).toBe(200)
    expect(JSON.parse(resp.text).playlists).toEqual({ exported: PLAYLISTS, saved: PLAYLISTS })
    expect(JSON.parse(resp.text).tracks).toEqual({ exported: PLAYLISTS * TRACKS, saved: PLAYLISTS * TRACKS })
  })
})
