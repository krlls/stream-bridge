import { describe, beforeEach, afterEach, expect } from '@jest/globals'

import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { fakeControllerContainer } from '../helpers/inversify.test.config'
import { TYPES } from '../../types/const'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateUserDTO } from '../../modules/user/dtos/CreateUserDTO'
import { testStreamingDTO, testUserData } from '../helpers/test.helpers'
import { UserDTO } from '../../modules/user/dtos/UserDTO'
import { ServiceResultDTO } from '../../types/common'
import { isServiceError } from '../../utils/errors'
import { IStreamingService } from '../../modules/streaming/interfaces/IStreamingService'

const userService = fakeControllerContainer.get<IUserService>(TYPES.UserService)
const streamingService = fakeControllerContainer.get<IStreamingService>(TYPES.StreamingService)
describe('Track service tests', () => {
  let currentUser: ServiceResultDTO<UserDTO>

  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
    currentUser = await userService.createUser(new CreateUserDTO(testUserData))
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  it('Create streaming works', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }
    const streamingDTO = testStreamingDTO(currentUser.id)
    const streaming = await streamingService.createSreaming(streamingDTO)

    expect(streaming).toHaveProperty('id')
    expect(streaming).toHaveProperty('token', streamingDTO.token)
  })
})
