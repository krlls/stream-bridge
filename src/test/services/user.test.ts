import { expect, test, describe, beforeEach, afterEach } from '@jest/globals'

import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { fakeControllerContainer } from '../helpers/inversify.test.config'
import { TYPES } from '../../types/const'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateUserDTO } from '../../modules/user/dtos/CreateUserDTO'
import { testUserData } from '../helpers/test.helpers'
import { UserDTO } from '../../modules/user/dtos/UserDTO'
import { UpadteUserDTO } from '../../modules/user/dtos/UpdateUserDTO'

const userService = fakeControllerContainer.get<IUserService>(TYPES.UserService)
describe('User service tests', () => {
  const user = new CreateUserDTO(testUserData)

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

  test('Find user by id', async () => {
    const newUser = await userService.createUser(user)
    const result = await userService.findUserById((newUser as any as UserDTO).id)

    expect(result).toHaveProperty('name', user.name)
  })

  test('Update user works', async () => {
    const newUser = (await userService.createUser(user)) as UserDTO
    const toUpdate = new UpadteUserDTO({ id: newUser.id, login: 'ksmi2' })
    const result = await userService.updateUser(toUpdate)

    expect(result).toHaveProperty('login', toUpdate.login)
    expect(result).toHaveProperty('name', user.name)
  })

  test('Update none exist user', async () => {
    const toUpdate = new UpadteUserDTO({ id: 10, login: 'ksmi2' })
    const result = await userService.updateUser(toUpdate)

    expect(result).toHaveProperty('error')
  })
})
