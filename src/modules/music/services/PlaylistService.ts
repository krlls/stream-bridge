import { inject, injectable } from 'inversify'

import { IPlaylistService } from '../interfaces/IPlaylistService'
import { IPlaylistRepository } from '../interfaces/IPlaylistRepository'
import { TYPES } from '../../../types/const'
import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors } from '../../../types/common'
import { ExportPlaylistsDTO } from '../dtos/ExportPlaylistsDTO'
import { IStreamingClient } from '../clients/IStreamingClient'
import { GetPlaylistsDTO } from '../dtos/GetPlaylistsDTO'
import { IStreamingRepository } from '../../streaming/interfaces/IStreamingRepository'
import { ExportResultDTO } from '../dtos/ExportResultDTO'

const STEP = 50

@injectable()
export class PlaylistService implements IPlaylistService {
  @inject(TYPES.PlaylistRepository) private playlistRrpository: IPlaylistRepository
  @inject(TYPES.Client) private streamingClient: IStreamingClient
  @inject(TYPES.StreamingRepository) private streamingRepository: IStreamingRepository

  async createPlayList(playlist: CreatePlaylistDTO) {
    const newPlaylist = await this.playlistRrpository.createPlaylist(playlist)

    if (!newPlaylist) {
      return new ErrorDTO(Errors.PLAYLIST_CREATE_ERROR)
    }

    return newPlaylist
  }

  async getPlaylistById(id: number) {
    const playlist = await this.playlistRrpository.getPlaylistById(id)

    if (!playlist) {
      return null
    }

    return playlist
  }

  async getPlaylistByExternalId(extenalId: string) {
    return await this.playlistRrpository.getPlaylistByExternalId(extenalId)
  }

  async getUserPlaylists(userId: number) {
    return (await this.playlistRrpository.getPlaylistsByUserId(userId)) || []
  }

  async exportPlaylists(toExport: ExportPlaylistsDTO) {
    const { userId } = toExport
    this.streamingClient.set(toExport.streamingType)

    const streaming = await this.streamingRepository.getStreaming(toExport.userId, toExport.streamingType)

    if (!streaming) {
      return new ErrorDTO(Errors.STREAMING_NOT_FOUND)
    }

    const counter = {
      exported: 0,
      saved: 0,
      offset: 0,
    }

    while (!counter.exported || !(counter.exported % STEP)) {
      const getPlaylists = new GetPlaylistsDTO({
        offset: counter.offset,
        token: streaming.token || '',
        refreshToken: streaming.reefresh_token || '',
      })

      const chunk = (await this.streamingClient.getPlaylists(getPlaylists)) || []

      if (chunk.length === 0) {
        break
      }

      const playlistsData = chunk.map((p) => p.toCreate({ userId, streamingId: streaming.id }))
      const savedPlaylists = await this.playlistRrpository.createPlaylists(playlistsData)

      counter.saved += savedPlaylists.length
      counter.exported += chunk.length
      counter.offset += STEP
    }

    return new ExportResultDTO({ ...counter })
  }
}
