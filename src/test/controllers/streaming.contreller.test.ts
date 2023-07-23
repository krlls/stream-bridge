import { expect, test, describe, beforeEach, afterEach } from '@jest/globals'

import { Api } from '../../types/TApi'
import { TestApp } from '../index.test'
import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { authUrl, importUrl, streamingUrl, testStreamingDTO, testUserData, userUrl } from '../helpers/test.helpers'
import { EStreamingType } from '../../types/common'
import { appContainer } from '../../inversify.config'
import { IStreamingService } from '../../modules/streaming/interfaces/IStreamingService'
import { TYPES } from '../../types/const'

const streamingService = appContainer.get<IStreamingService>(TYPES.StreamingService)

describe('Streaming controllers tests', () => {
  let testToken: string = ''

  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
    await TestApp.post(userUrl(Api.User.Create.URL)).send(testUserData)

    const resp = await TestApp.post(authUrl(Api.Auth.Login.URL)).send({
      login: testUserData.login,
      pass: testUserData.pass,
    })
    testToken = JSON.parse(resp.text).token
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  test('Get auth url works', async () => {
    const response = await TestApp.get(
      streamingUrl(Api.Streaming.Auth.PATCH, `/${EStreamingType.SPOTIFY.toLowerCase()}`),
    ).set({
      Authorization: `Bearer ${testToken}`,
    })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toHaveProperty('url')
  })

  test('List streamings by user id', async () => {
    await streamingService.createStreaming(testStreamingDTO(1))
    await TestApp.post(importUrl(Api.Import.Playlists.URL))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .send({
        streamingType: Api.Streaming.EApiStreamingType.SPOTIFY,
      })

    const streamings = await TestApp.get(streamingUrl(Api.Streaming.List.URL)).set({
      Authorization: `Bearer ${testToken}`,
    })

    expect(streamings.status).toBe(200)
    expect(JSON.parse(streamings.text)?.items).toHaveLength(1)
  })

  test('Remove streaming by type', async () => {
    await streamingService.createStreaming(testStreamingDTO(1))

    const response = await TestApp.delete(
      streamingUrl(Api.Streaming.Delete.PATCH, `/${EStreamingType.SPOTIFY.toLowerCase()}`),
    ).set({
      Authorization: `Bearer ${testToken}`,
    })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toHaveProperty('deleted', 1)
  })

  test('Remove non exist streaming by type', async () => {
    const response = await TestApp.delete(
      streamingUrl(Api.Streaming.Delete.PATCH, `/${EStreamingType.SPOTIFY.toLowerCase()}`),
    ).set({
      Authorization: `Bearer ${testToken}`,
    })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toHaveProperty('deleted', 0)
  })
})
