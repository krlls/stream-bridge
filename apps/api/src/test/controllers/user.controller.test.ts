import { expect, it, describe, beforeEach, afterEach } from '@jest/globals'
import { Api } from 'api-types'

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

  it('Update profile works', async () => {
    const newData = { login: 'ksmi2', pass: '123456789944', name: 'Kirill 123' }
    const response = await TestApp.patch(userUrl(Api.User.Update.URL))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .send(newData)

    const respLogin = await TestApp.post(authUrl(Api.Auth.Login.URL)).send({ login: newData.login, pass: newData.pass })

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toHaveProperty('name', newData.name)
    expect(JSON.parse(response.text)).toHaveProperty('login', newData.login)

    expect(respLogin.status).toBe(200)
    expect(JSON.parse(respLogin.text)).toHaveProperty('token')
  })

  it('Update profile 400', async () => {
    const newData = { someLogin: 'ksmi2', pass: '1234564', badName: 'Kirill' }
    const response = await TestApp.patch(userUrl(Api.User.Update.URL))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .send(newData)

    const respLogin = await TestApp.post(authUrl(Api.Auth.Login.URL)).send({
      login: newData.someLogin,
      pass: newData.pass,
    })

    expect(response.status).toBe(400)
    expect(respLogin.status).toBe(401)
  })

  it('Update profile 400 with empty body', async () => {
    const newData = {}
    const response = await TestApp.patch(userUrl(Api.User.Update.URL))
      .set({
        Authorization: `Bearer ${testToken}`,
      })
      .send(newData)

    expect(response.status).toBe(400)
  })
})
