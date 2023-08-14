import { expect, it, describe, beforeEach, afterEach } from '@jest/globals'

import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { appContainer } from '../../inversify.config'
import { TYPES } from '../../types/const'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateUserDTO } from '../../modules/user/dtos/CreateUserDTO'
import { testUserData } from '../helpers/test.helpers'
import { UserDTO } from '../../modules/user/dtos/UserDTO'
import { UpdateUserDTO } from '../../modules/user/dtos/UpdateUserDTO'
import { IAuthService } from '../../modules/auth/interfaces/IAuthService'
import { LoginDTO } from '../../modules/auth/dtos/LoginDTO'

const userService = appContainer.get<IUserService>(TYPES.UserService)
const authService = appContainer.get<IAuthService>(TYPES.AuthService)
describe('User service tests', () => {
  const user = new CreateUserDTO(testUserData)

  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  it('Create user works', async () => {
    const result = await userService.createUser(user)

    expect(result).not.toHaveProperty('error')
    expect(result).toHaveProperty('id')
  })

  it('Create user not work', async () => {
    await userService.createUser(user)

    const errorResult = await userService.createUser(user)

    expect(errorResult).toHaveProperty('error')
  })

  it('Find user by id', async () => {
    const newUser = (await userService.createUser(user)) as UserDTO
    const result = await userService.findUserById(newUser.id)

    expect(result).toHaveProperty('name', user.name)
  })

  it('Update user works', async () => {
    const newUser = (await userService.createUser(user)) as UserDTO
    const toUpdate = new UpdateUserDTO({ id: newUser.id, login: 'ksmi2' })
    const result = await userService.updateUser(toUpdate)

    expect(result).toHaveProperty('login', toUpdate.login)
    expect(result).toHaveProperty('name', user.name)
  })

  it('Update none exist user', async () => {
    const toUpdate = new UpdateUserDTO({ id: 10, login: 'ksmi2' })
    const result = await userService.updateUser(toUpdate)

    expect(result).toHaveProperty('error')
  })

  it('Update pass works', async () => {
    const newPass = '123456789'
    const newUser = (await userService.createUser(user)) as UserDTO
    const toUpdate = new UpdateUserDTO({ id: newUser.id, pass: newPass })
    const result = await userService.updateUser(toUpdate)

    const loginResp = await authService.login(new LoginDTO(newUser.login, newPass))

    expect(result).not.toHaveProperty('error')
    expect(loginResp).toHaveProperty('token')
  })
})
