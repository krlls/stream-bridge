import { afterEach, beforeEach, describe, expect, test } from '@jest/globals'

import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { appContainer } from '../../inversify.config'
import { TYPES } from '../../types/const'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateUserDTO } from '../../modules/user/dtos/CreateUserDTO'
import { PLAYLISTS, testPlaylistDTO, testStreamingDTO, testUserData } from '../helpers/test.helpers'
import { IPlaylistService } from '../../modules/music/interfaces/IPlaylistService'
import { CreatePlaylistDTO } from '../../modules/music/dtos/CreatePlaylistDTO'
import { UserDTO } from '../../modules/user/dtos/UserDTO'
import { Errors, EStreamingType, ServiceResultDTO } from '../../types/common'
import { isServiceError } from '../../utils/errors'
import { IStreamingService } from '../../modules/streaming/interfaces/IStreamingService'
import { ImportMediaDTO } from '../../modules/music/dtos/ImportMediaDTO'
import { Playlist } from '../../modules/music/entities/Playlist'

const playlistService = appContainer.get<IPlaylistService>(TYPES.PlaylistService)
const userService = appContainer.get<IUserService>(TYPES.UserService)
const streamingService = appContainer.get<IStreamingService>(TYPES.StreamingService)
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

    const streaming = await streamingService.createStreaming(testStreamingDTO(currentUser.id))

    if (isServiceError(streaming)) {
      throw Error('Streaming not created')
    }

    const playlistData = new CreatePlaylistDTO(testPlaylistDTO(currentUser.id, streaming.id))

    const playlist = await playlistService.createPlayList(playlistData)

    expect(playlist).toHaveProperty('id')
  })

  test('Find playlist by id works', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }

    const streaming = await streamingService.createStreaming(testStreamingDTO(currentUser.id))

    if (isServiceError(streaming)) {
      throw Error('Streaming not created')
    }

    const playlistData = new CreatePlaylistDTO(testPlaylistDTO(currentUser.id, streaming.id))

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

    const streaming = await streamingService.createStreaming(testStreamingDTO(currentUser.id))

    if (isServiceError(streaming)) {
      throw Error('Streaming not created')
    }

    const playlistData = new CreatePlaylistDTO(testPlaylistDTO(currentUser.id, streaming.id))

    await playlistService.createPlayList(playlistData)

    const findPlaylist = await playlistService.getAllUserPlaylists({ userId: currentUser.id })

    expect(findPlaylist).toHaveLength(1)
  })

  test('Find playlist by external id works', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }

    const streaming = await streamingService.createStreaming(testStreamingDTO(currentUser.id))

    if (isServiceError(streaming)) {
      throw Error('Streaming not created')
    }

    const testData = testPlaylistDTO(currentUser.id, streaming.id)
    const playlistData = new CreatePlaylistDTO(testData)

    await playlistService.createPlayList(playlistData)

    const findPlaylist = await playlistService.getPlaylistByExternalId(testData.externalId)

    expect(findPlaylist).toHaveProperty('external_id', testData.externalId)
  })

  test('Export playlist works', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }

    const streaming = await streamingService.createStreaming(testStreamingDTO(currentUser.id))

    if (isServiceError(streaming)) {
      throw Error('Streaming not created')
    }

    const exportData = new ImportMediaDTO({
      streamingType: EStreamingType.SPOTIFY,
      userId: currentUser.id,
    })

    const exportResult = (await playlistService.importPlaylists(exportData)) as any

    expect(exportResult).toEqual({ exported: PLAYLISTS, saved: PLAYLISTS })
    expect(exportResult.exported).toBe(exportResult.saved)
  })

  test('Re-exporting playlists does not create duplicates', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }

    const streaming = await streamingService.createStreaming(testStreamingDTO(currentUser.id))

    if (isServiceError(streaming)) {
      throw Error('Streaming not created')
    }

    const exportData = new ImportMediaDTO({
      streamingType: EStreamingType.SPOTIFY,
      userId: currentUser.id,
    })

    await playlistService.importPlaylists(exportData)

    const exportResult = (await playlistService.importPlaylists(exportData)) as any
    const totalPlaylists = (await playlistService.getAllUserPlaylists({ userId: currentUser.id })) as any

    expect(totalPlaylists.length).toBe(exportResult.exported)
  })

  test('Remove unused playlists', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }

    const streaming = await streamingService.createStreaming(testStreamingDTO(currentUser.id))

    if (isServiceError(streaming)) {
      throw Error('Streaming not created')
    }

    const exportData = new ImportMediaDTO({
      streamingType: EStreamingType.SPOTIFY,
      userId: currentUser.id,
    })

    const unusedPlaylist = (await playlistService.createPlayList(
      testPlaylistDTO(currentUser.id, streaming.id),
    )) as Playlist

    await playlistService.importPlaylists(exportData)

    const exportResult = (await playlistService.importPlaylists(exportData)) as any
    const totalPlaylists = (await playlistService.getAllUserPlaylists({ userId: currentUser.id })) as any

    const checkPlaylist = await playlistService.getPlaylistById(unusedPlaylist.id)

    expect(totalPlaylists.length).toBe(exportResult.exported)
    expect(checkPlaylist).toHaveProperty('error', Errors.PLAYLIST_NOT_FOUND)
  })
})
