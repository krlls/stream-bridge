import { expect, test, describe, beforeEach, afterEach } from '@jest/globals'

import { Api } from '../../types/TApi'
import { createPatch } from '../../utils/links'
import { TestApp } from '../index.test'
import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'

const userUrl: (...args: string[]) => string = createPatch.bind(null, Api.User.PREFIX)
const authUrl: (...args: string[]) => string = createPatch.bind(null, Api.Auth.PREFIX)
const user = {
  login: 'Ksmi',
  name: 'Kirill',
  pass: '123',
}

describe('Auth controllers tests', () => {
  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
    await TestApp.post(userUrl(Api.User.Create.URL)).send(user)
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  test('Auth works', async () => {
    const authData: Api.Auth.Login.Req = { login: user.login, pass: user.pass }
    const response = await TestApp.post(authUrl(Api.Auth.Login.URL)).send(authData)

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toHaveProperty('token')
  })

  test('Auth with not valid password', async () => {
    const authData: Api.Auth.Login.Req = { login: user.login, pass: user.pass + 'random string' }
    const response = await TestApp.post(authUrl(Api.Auth.Login.URL)).send(authData)

    expect(response.status).toBe(403)
    expect(JSON.parse(response.text)).toHaveProperty('error')
  })

  test('Auth with not valid login', async () => {
    const authData: Api.Auth.Login.Req = { login: user.login + 'random string', pass: user.pass }
    const response = await TestApp.post(authUrl(Api.Auth.Login.URL)).send(authData)

    expect(response.status).toBe(403)
    expect(JSON.parse(response.text)).toHaveProperty('error')
    expect(response.text).toMatchSnapshot()
  })

  test('Auth with not valid data', async () => {
    const authData = { login: '12', password: user.pass }
    const response = await TestApp.post(authUrl(Api.Auth.Login.URL)).send(authData)

    expect(response.status).toBe(400)
  })
})
