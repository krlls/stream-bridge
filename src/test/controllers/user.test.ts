import { expect, test, describe, beforeEach, afterEach } from '@jest/globals'

import { Api } from '../../types/TApi'
import { createPatch } from '../../utils/links'
import { TestApp } from '../index.test'
import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'

describe('User tests', () => {
  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  const vkPatch: (...args: string[]) => string = createPatch.bind(null, Api.User.PREFIX)

  test('Create user works', async () => {
    const validUserData = {
      login: 'Ksmi',
      name: 'Kirill',
      pass: '123',
    }

    const response = await TestApp.post(vkPatch(Api.User.Create.URL)).send(validUserData)

    expect(response.status).toBe(200)
    expect(response.text).toMatchSnapshot()
  })

  test('Create user with not valid', async () => {
    const notValidUserData = {
      login: 1234,
      pass: 123,
    }

    const response = await TestApp.post(vkPatch(Api.User.Create.URL)).send(notValidUserData)

    expect(response.status).toBe(400)
    expect(response.text).toMatchSnapshot()
  })

  test('Create exist user', async () => {
    const userData = {
      login: 'Ksmi',
      name: 'Kirill',
      pass: '123',
    }

    const response = await TestApp.post(vkPatch(Api.User.Create.URL)).send(userData)
    const response2 = await TestApp.post(vkPatch(Api.User.Create.URL)).send(userData)

    expect(response.status).toBe(200)
    // eslint-disable-next-line no-console
    console.log(response2.text)
    expect(response2.text).toMatchSnapshot()
  })
})
