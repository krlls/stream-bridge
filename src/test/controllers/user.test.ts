import { expect, test, describe, beforeEach, afterEach } from '@jest/globals'

import { Api } from '../../types/TApi'
import { TestApp } from '../index.test'
import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { testUserData, userUrl } from '../helpers/test.helpers'

describe('User tests', () => {
  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  test('Create user works', async () => {
    const response = await TestApp.post(userUrl(Api.User.Create.URL)).send(testUserData)

    expect(response.status).toBe(200)
    expect(response.text).toMatchSnapshot()
  })

  test('Create user with not valid', async () => {
    const notValidUserData = {
      login: 1234,
      pass: 123,
    }

    const response = await TestApp.post(userUrl(Api.User.Create.URL)).send(notValidUserData)

    expect(response.status).toBe(400)
    expect(response.text).toMatchSnapshot()
  })

  test('Create exist user', async () => {
    const response = await TestApp.post(userUrl(Api.User.Create.URL)).send(testUserData)
    const response2 = await TestApp.post(userUrl(Api.User.Create.URL)).send(testUserData)

    expect(response.status).toBe(200)
    expect(response2.text).toMatchSnapshot()
  })
})
