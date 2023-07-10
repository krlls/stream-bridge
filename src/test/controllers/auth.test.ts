import { expect, test, describe, beforeEach, afterEach } from '@jest/globals'

import { Api } from '../../types/TApi'
import { TestApp } from '../main.test'
import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { authUrl, testUserData, userUrl } from '../helpers/test.helpers'

describe('Auth controllers tests', () => {
  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
    await TestApp.post(userUrl(Api.User.Create.URL)).send(testUserData)
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  test('Auth works', async () => {
    const authData: Api.Auth.Login.Req = { login: testUserData.login, pass: testUserData.pass }
    const response = await TestApp.post(authUrl(Api.Auth.Login.URL)).send(authData)

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toHaveProperty('token')
  })

  test('Auth with not valid password', async () => {
    const authData: Api.Auth.Login.Req = { login: testUserData.login, pass: testUserData.pass + 'random string' }
    const response = await TestApp.post(authUrl(Api.Auth.Login.URL)).send(authData)

    expect(response.status).toBe(403)
    expect(JSON.parse(response.text)).toHaveProperty('error')
  })

  test('Auth with not valid login', async () => {
    const authData: Api.Auth.Login.Req = { login: testUserData.login + 'random string', pass: testUserData.pass }
    const response = await TestApp.post(authUrl(Api.Auth.Login.URL)).send(authData)

    expect(response.status).toBe(403)
    expect(JSON.parse(response.text)).toHaveProperty('error')
    expect(response.text).toMatchSnapshot()
  })

  test('Auth with not valid data', async () => {
    const authData = { login: '12', password: testUserData.pass }
    const response = await TestApp.post(authUrl(Api.Auth.Login.URL)).send(authData)

    expect(response.status).toBe(400)
  })
})
