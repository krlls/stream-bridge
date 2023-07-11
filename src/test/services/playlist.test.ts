import { expect, test, describe, beforeEach, afterEach } from '@jest/globals'

import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { fakeControllerContainer } from '../helpers/inversify.test.config'
import { TYPES } from '../../types/const'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateUserDTO } from '../../modules/user/dtos/CreateUserDTO'
import { testPlaylistDTO, testUserData } from '../helpers/test.helpers'
import { IPlaylistService } from '../../modules/music/interfaces/IPlaylistService'
import { CreatePlaylistDTO } from '../../modules/music/dtos/CreatePlaylistDTO'
import { UserDTO } from '../../modules/user/dtos/UserDTO'
import { ServiceResultDTO } from '../../types/common'
import { isServiceError } from '../../utils/errors'

const playlistService = fakeControllerContainer.get<IPlaylistService>(TYPES.PlaylistService)
const userService = fakeControllerContainer.get<IUserService>(TYPES.UserService)
describe('Playlist service tests', () => {
  let currentUser: ServiceResultDTO<UserDTO>

  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
    const user = new CreateUserDTO(testUserData)
    currentUser = await userService.createUser(user)
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  test('Create playlist works', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }

    const playlistData = new CreatePlaylistDTO({
      userId: currentUser.id,
      name: 'Test playlist',
      externalId: '65FD4G65SF',
    })

    const playlist = await playlistService.createPlayList(playlistData)

    expect(playlist).toHaveProperty('id')
  })

  test('Find playlist by id works', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }

    const playlistData = new CreatePlaylistDTO(testPlaylistDTO(currentUser.id))

    const playlist = await playlistService.createPlayList(playlistData)

    if (isServiceError(playlist)) {
      throw Error('Playlist not created')
    }

    const findPlaylist = await playlistService.getPlaylistById(playlist.id)

    expect(findPlaylist).not.toBe(null)
  })

  test('Find playlist by id works', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }

    const playlistData = new CreatePlaylistDTO(testPlaylistDTO(currentUser.id))

    await playlistService.createPlayList(playlistData)

    const findPlaylist = await playlistService.getUserPlaylists(currentUser.id)

    expect(findPlaylist).toHaveLength(1)
  })

  test('Find playlist by external id works', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }

    const testData = testPlaylistDTO(currentUser.id)
    const playlistData = new CreatePlaylistDTO(testData)

    await playlistService.createPlayList(playlistData)

    const findPlaylist = await playlistService.getPlaylistByExternalId(testData.externalId)

    expect(findPlaylist).toHaveProperty('external_id', testData.externalId)
  })
})