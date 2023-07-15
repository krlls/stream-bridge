import { afterEach, beforeEach, describe, expect, test } from '@jest/globals'

import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { TYPES } from '../../types/const'
import { controllerContainer } from '../../inversify.config'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateUserDTO } from '../../modules/user/dtos/CreateUserDTO'
import { getRandomTracks, testPlaylistDTO, testStreamingDTO, testTrackDTO, testUserData } from '../helpers/test.helpers'
import { IPlaylistService } from '../../modules/music/interfaces/IPlaylistService'
import { UserDTO } from '../../modules/user/dtos/UserDTO'
import { EStreamingType, ServiceResultDTO } from '../../types/common'
import { isServiceError } from '../../utils/errors'
import { ITrackService } from '../../modules/music/interfaces/TrackService'
import { IStreamingService } from '../../modules/streaming/interfaces/IStreamingService'
import { ImportMediaDTO } from '../../modules/music/dtos/ImportMediaDTO'
import { PLAYLISTS, TRACKS } from '../../infra/clients/StreamingClient/Spotify/adapters/SpotifyClient'

const playlistService = controllerContainer.get<IPlaylistService>(TYPES.PlaylistService)
const userService = controllerContainer.get<IUserService>(TYPES.UserService)
const trackService = controllerContainer.get<ITrackService>(TYPES.TrackService)
const streamingService = controllerContainer.get<IStreamingService>(TYPES.StreamingService)
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

    const streaming = await streamingService.createSreaming(testStreamingDTO(currentUser.id))

    if (isServiceError(streaming)) {
      throw Error('Streaming not created')
    }

    const playlist = await playlistService.createPlayList(testPlaylistDTO(currentUser.id, streaming.id))

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

    const streaming = await streamingService.createSreaming(testStreamingDTO(currentUser.id))

    if (isServiceError(streaming)) {
      throw Error('Streaming not created')
    }

    const playlist = await playlistService.createPlayList(testPlaylistDTO(currentUser.id, streaming.id))

    if (isServiceError(playlist)) {
      throw Error('Playlist not created')
    }

    const tracksSize = 10
    const createTracks = getRandomTracks({ userId: currentUser.id, playlistId: playlist.id }, tracksSize).map((dto) =>
      trackService.saveTrack(dto),
    )

    await Promise.all(createTracks)

    const tracks = (await trackService.getTracksByPlaylist(playlist.id)) || []

    expect(tracks).toHaveLength(tracksSize)

    if (isServiceError(tracks)) {
      throw Error('Tracks not created')
    }

    for (const track of tracks) {
      expect(track).toHaveProperty('id')
    }
  })

  test('Export tracks by playlists', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }

    await streamingService.createSreaming(testStreamingDTO(currentUser.id))

    const exportData = new ImportMediaDTO({
      streamingType: EStreamingType.SPOTIFY,
      userId: currentUser.id,
    })

    await playlistService.importPlaylists(exportData)

    const dto = new ImportMediaDTO({ streamingType: EStreamingType.SPOTIFY, userId: currentUser.id })
    const exportCount = await trackService.importTracks(dto)

    if (isServiceError(exportCount)) {
      throw Error('User not created')
    }

    expect(exportCount.saved).toBe(TRACKS * PLAYLISTS)
    expect(exportCount.exported).toBe(exportCount.saved)
  })
})
