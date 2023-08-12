import { expect, it, describe, beforeEach, afterEach } from '@jest/globals'
import { Api } from 'api-types'

import { TestApp } from '../index.test'
import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { authUrl, testUserData, userUrl } from '../helpers/test.helpers'
import { createSignedJwt } from '../../utils/crypto'
import { testsWithToken } from '../helpers/testMany'

describe('Auth controllers tests', () => {
  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
    await TestApp.post(userUrl(Api.User.Create.URL)).send(testUserData)
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  it('Auth works', async () => {
    const authData: Api.Auth.Login.Req = {
      login: testUserData.login,
      pass: testUserData.pass,
    }
    const response = await TestApp.post(authUrl(Api.Auth.Login.URL)).send(authData)

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toHaveProperty('token')
  })

  it('Auth with not valid password', async () => {
    const authData: Api.Auth.Login.Req = {
      login: testUserData.login,
      pass: testUserData.pass + 'random string',
    }
    const response = await TestApp.post(authUrl(Api.Auth.Login.URL)).send(authData)

    expect(response.status).toBe(403)
    expect(JSON.parse(response.text)).toHaveProperty('error')
  })

  it('Auth with not valid login', async () => {
    const authData: Api.Auth.Login.Req = {
      login: testUserData.login + 'random string',
      pass: testUserData.pass,
    }
    const response = await TestApp.post(authUrl(Api.Auth.Login.URL)).send(authData)

    expect(response.status).toBe(403)
    expect(JSON.parse(response.text)).toHaveProperty('error')
    expect(response.text).toMatchSnapshot()
  })

  it('Auth with not valid data', async () => {
    const authData = { login: '12', password: testUserData.pass }
    const response = await TestApp.post(authUrl(Api.Auth.Login.URL)).send(authData)

    expect(response.status).toBe(400)
  })

  it('Test endpoints with wrong user id', async () => {
    const userToken = await createSignedJwt({ userId: 89 })

    return testsWithToken(userToken || '')()
  })

  it('Test endpoints with zero user id', async () => {
    const userToken = await createSignedJwt({ userId: 0 })

    return testsWithToken(userToken || '')()
  })
  it('Test endpoints with empty user id', async () => {
    const userToken = await createSignedJwt({})

    return testsWithToken(userToken || '')()
  })

  it('Test endpoints with undefined user id', async () => {
    const userToken = await createSignedJwt({ userId: undefined })

    return testsWithToken(userToken || '')()
  })
})
