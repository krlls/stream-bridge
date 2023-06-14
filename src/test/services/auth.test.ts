import { expect, test, describe, beforeEach, afterEach } from '@jest/globals'

import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { fakeControllerContainer } from '../helpers/inversify.test.config'
import { TYPES } from '../../types/const'
import { IAuthService } from '../../modules/auth/interfaces/IAuthService'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateUserDTO } from '../../modules/user/dtos/CreateUserDTO'
import { LoginDTO } from '../../modules/auth/dtos/LoginDTO'
import { testUserData } from '../helpers/test.helpers'

const authService = fakeControllerContainer.get<IAuthService>(TYPES.AuthService)
const userService = fakeControllerContainer.get<IUserService>(TYPES.UserService)
describe('Auth service tests', () => {
  const user = new CreateUserDTO(testUserData)

  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
    await userService.createUser(user)
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  test('Auth works', async () => {
    const loginData = new LoginDTO(user.login, user.pass)

    const result = await authService.login(loginData)

    expect(result).toHaveProperty('token')
  })

  test('Auth wrong credentials', async () => {
    const loginData = new LoginDTO(user.login, user.pass + 'random value 123')

    const result = await authService.login(loginData)

    expect(result).not.toHaveProperty('token')
    expect(result).toHaveProperty('error')
    expect(result).toMatchSnapshot()
  })
})
