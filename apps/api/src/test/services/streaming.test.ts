import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'

import { SqliteDB } from '../../infra/db/Sqlite/SetupConnection'
import { appContainer } from '../../inversify.config'
import { TYPES } from '../../types/const'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateUserDTO } from '../../modules/user/dtos/CreateUserDTO'
import { testStreamingDTO, testUserData } from '../helpers/test.helpers'
import { UserDTO } from '../../modules/user/dtos/UserDTO'
import { isServiceError } from '../../utils/errors'
import { IStreamingService } from '../../modules/streaming/interfaces/IStreamingService'
import { ImportMediaDTO } from '../../modules/music/dtos/ImportMediaDTO'
import { EStreamingType } from '../../types/common'
import { ImportTracksByPlaylistDTO } from '../../modules/music/dtos/ImportTracksByPlaylistDTO'
import { IPlaylistService } from '../../modules/music/interfaces/IPlaylistService'
import { ITrackService } from '../../modules/music/interfaces/TrackService'

const userService = appContainer.get<IUserService>(TYPES.UserService)
const streamingService = appContainer.get<IStreamingService>(TYPES.StreamingService)
const playlistService = appContainer.get<IPlaylistService>(TYPES.PlaylistService)
const trackService = appContainer.get<ITrackService>(TYPES.TrackService)

describe('Track service tests', () => {
  let currentUser: UserDTO

  beforeEach(async () => {
    await SqliteDB.instance.setupTestDB()
    currentUser = (await userService.createUser(new CreateUserDTO(testUserData))) as any
  })

  afterEach(async () => {
    await SqliteDB.instance.teardownTestDB()
  })

  it('Create streaming works', async () => {
    if (isServiceError(currentUser)) {
      throw Error('User not created')
    }

    const streamingDTO = testStreamingDTO(currentUser.id)
    const streaming = await streamingService.createStreaming(streamingDTO)

    expect(streaming).toHaveProperty('id')
    expect(streaming).toHaveProperty('token', streamingDTO.token)
  })

  it('Creating two identical streams does not work (by type)', async () => {
    const streamingDTO = testStreamingDTO(currentUser.id)
    await streamingService.createStreaming(streamingDTO)

    const twoStreaming = await streamingService.createStreaming(streamingDTO)

    expect(isServiceError(twoStreaming)).toBe(true)
  })

  it('Get streamings by userId works', async () => {
    // const streamingsLength = 10
    await streamingService.createStreaming(testStreamingDTO(currentUser.id))
    await streamingService.createStreaming(testStreamingDTO(currentUser.id, EStreamingType.TIDAL))

    const exportData = new ImportMediaDTO({
      streamingType: EStreamingType.SPOTIFY,
      userId: currentUser.id,
    })

    await appContainer.get<IPlaylistService>(TYPES.PlaylistService).importPlaylists(exportData)

    await playlistService.importPlaylists(
      new ImportMediaDTO({
        streamingType: EStreamingType.TIDAL,
        userId: currentUser.id,
      }),
    )

    const playlists = await playlistService.getAllUserPlaylists({
      userId: currentUser.id,
    })

    if (isServiceError(playlists)) {
      throw Error('No playlists')
    }

    const dto = new ImportTracksByPlaylistDTO({
      playlistId: playlists[0].id,
      userId: currentUser.id,
    })
    await trackService.importTracksByPlaylist(dto)

    const streamings = (await streamingService.getUserStreamings(currentUser.id)) as any[]

    expect(streamings).toHaveLength(2)
  })

  it('Remove streaming works', async () => {
    const streamingDTO = testStreamingDTO(currentUser.id)
    const streaming = (await streamingService.createStreaming(streamingDTO)) as any

    const removeResult = (await streamingService.removeStreamingByType(currentUser.id, streaming.type)) as any
    const emptyStreaming = (await streamingService.getUserStreamings(currentUser.id)) as any

    expect(removeResult).toHaveProperty('deleted', 1)
    expect(emptyStreaming).toHaveLength(0)
  })

  it('Remove all data when remove streaming works', async () => {
    const streamingDTO = testStreamingDTO(currentUser.id)
    const streaming = (await streamingService.createStreaming(streamingDTO)) as any

    await appContainer.get<IPlaylistService>(TYPES.PlaylistService).importPlaylists(
      new ImportMediaDTO({
        streamingType: EStreamingType.SPOTIFY,
        userId: currentUser.id,
      }),
    )

    const playlists = (await playlistService.getAllUserPlaylists({
      userId: currentUser.id,
    })) as any

    ;(await trackService.importTracksByPlaylist(
      new ImportTracksByPlaylistDTO({ playlistId: playlists[0].id, userId: currentUser.id }),
    )) as any
    ;(await streamingService.removeStreamingByType(currentUser.id, streaming.type)) as any

    const emptyStreaming = (await streamingService.getUserStreamings(currentUser.id)) as any
    const allPlaylists = (await playlistService.getAllUserPlaylists({
      userId: currentUser.id,
    })) as any
    const allTracks = await trackService.getAllTracksByPlaylistId(playlists[0].id)

    expect(emptyStreaming).toHaveLength(0)
    expect(allPlaylists).toHaveLength(0)
    expect(allTracks).toHaveLength(0)
  })
})
