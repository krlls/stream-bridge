import { expect, test, describe, beforeEach, afterEach } from '@jest/globals'

import { Api } from '../../types/TApi'
import { TestApp } from '../index.test'
import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { authUrl, streamingUrl, testUserData, userUrl } from '../helpers/test.helpers'
import { EStreamingType } from '../../types/common'
import { createSignedJwt } from '../../utils/crypto'

describe('Auth controllers tests', () => {
  let testToken: string = ''
  let user = { id: 0 }

  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()

    const userResp = await TestApp.post(userUrl(Api.User.Create.URL)).send(testUserData)

    const resp = await TestApp.post(authUrl(Api.Auth.Login.URL)).send({
      login: testUserData.login,
      pass: testUserData.pass,
    })
    testToken = JSON.parse(resp.text).token
    user = JSON.parse(userResp.text)
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  test('Save streaming data works', async () => {
    const jwt = await createSignedJwt({ userId: user?.id })

    const response = await TestApp.get(streamingUrl(`/token/${EStreamingType.SPOTIFY.toLowerCase()}`)).query({
      code: 'test',
      state: jwt,
    })

    expect(response.status).toBe(200)
    // expect(JSON.parse(response.text)).toHaveProperty('test')
  })

  test('Get auth url works', async () => {
    const response = await TestApp.get(streamingUrl(`/auth/${EStreamingType.SPOTIFY.toLowerCase()}`)).set({
      Authorization: `Bearer ${testToken}`,
    })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toHaveProperty('url')
  })
})
