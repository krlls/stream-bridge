import { expect, test, describe, beforeEach, afterEach } from '@jest/globals'

import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { fakeControllerContainer } from '../helpers/inversify.test.config'
import { TYPES } from '../../types/const'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateUserDTO } from '../../modules/user/dtos/CreateUserDTO'
import { getRandomTracks, testPlaylistDTO, testTrackDTO, testUserData } from '../helpers/test.helpers'
import { IPlaylistService } from '../../modules/music/interfaces/IPlaylistService'
import { UserDTO } from '../../modules/user/dtos/UserDTO'
import { ServiceResultDTO } from '../../types/common'
import { isServiceError } from '../../utils/errors'
import { ITrackService } from '../../modules/music/interfaces/TrackService'

const playlistService = fakeControllerContainer.get<IPlaylistService>(TYPES.PlaylistService)
const userService = fakeControllerContainer.get<IUserService>(TYPES.UserService)
const trackService = fakeControllerContainer.get<ITrackService>(TYPES.TrackService)
describe('Track service tests', () => {
  let currentUser: ServiceResultDTO<UserDTO>

  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
    const user = new CreateUserDTO(testUserData)
    currentUser = await userService.createUser(user)
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  test('Create track works', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }

    const playlist = await playlistService.createPlayList(testPlaylistDTO(currentUser.id))

    if (isServiceError(playlist)) {
      throw Error('Playlist not created')
    }

    const trackDTO = testTrackDTO(currentUser.id, playlist.id)
    const track = await trackService.saveTrack(trackDTO)

    expect(track).toHaveProperty('id')
    expect(track).toHaveProperty('name', trackDTO.name)
  })

  test('Get tracks by playlist works', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }

    const playlist = await playlistService.createPlayList(testPlaylistDTO(currentUser.id))

    if (isServiceError(playlist)) {
      throw Error('Playlist not created')
    }

    const tracksSize = 10
    const createTracks = getRandomTracks({ userId: currentUser.id, playlistId: playlist.id }, tracksSize).map((dto) =>
      trackService.saveTrack(dto),
    )

    await Promise.all(createTracks)

    const tracks = (await trackService.getTracksByPlayist(playlist.id)) || []

    expect(tracks).toHaveLength(tracksSize)

    if (isServiceError(tracks)) {
      throw Error('Tracks not created')
    }

    for (const track of tracks) {
      expect(track).toHaveProperty('id')
    }
  })
})
