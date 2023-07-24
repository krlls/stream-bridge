import { expect, it, describe, beforeEach, afterEach } from '@jest/globals'

import { Api } from '../../types/TApi'
import { TestApp } from '../index.test'
import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { authUrl, testUserData, userUrl } from '../helpers/test.helpers'

describe('User tests', () => {
  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  it('Create user works', async () => {
    const response = await TestApp.post(userUrl(Api.User.Create.URL)).send(testUserData)

    expect(response.status).toBe(200)
    expect(response.text).toMatchSnapshot()
  })

  it('Create user with not valid', async () => {
    const notValidUserData = {
      login: 1234,
      pass: 123,
    }

    const response = await TestApp.post(userUrl(Api.User.Create.URL)).send(notValidUserData)

    expect(response.status).toBe(400)
    expect(response.text).toMatchSnapshot()
  })

  it('Create exist user', async () => {
    const response = await TestApp.post(userUrl(Api.User.Create.URL)).send(testUserData)
    const response2 = await TestApp.post(userUrl(Api.User.Create.URL)).send(testUserData)

    expect(response.status).toBe(200)
    expect(response2.text).toMatchSnapshot()
  })
})

describe('With auth controllers', () => {
  let testToken = ''

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

  it('Get Profile with wrong token', async () => {
    const response = await TestApp.get(userUrl(Api.User.GetProfile.URL)).set({
      Authorization: `Bearer ${testToken}randomstring`,
    })

    expect(response.status).toBe(401)
  })

  it('Get Profile', async () => {
    const response = await TestApp.get(userUrl(Api.User.GetProfile.URL)).set({
      Authorization: `Bearer ${testToken}`,
    })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toHaveProperty('name', testUserData.name)
    expect(response.text).toMatchSnapshot()
  })
})
