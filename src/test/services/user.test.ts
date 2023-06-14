import { expect, test, describe, beforeEach, afterEach } from '@jest/globals'

import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { fakeControllerContainer } from '../helpers/inversify.test.config'
import { TYPES } from '../../types/const'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateUserDTO } from '../../modules/user/dtos/CreateUserDTO'

const userService = fakeControllerContainer.get<IUserService>(TYPES.UserService)
describe('User service tests', () => {
  const user = new CreateUserDTO({
    login: 'Ksmi',
    name: 'Kirill',
    pass: '123',
  })

  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  test('Create user works', async () => {
    const result = await userService.createUser(user)

    expect(result).not.toHaveProperty('error')
    expect(result).toHaveProperty('id')
  })

  test('Create user not work', async () => {
    await userService.createUser(user)
    const errorResult = await userService.createUser(user)

    expect(errorResult).toHaveProperty('error')
  })
})
