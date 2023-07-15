import { inject, injectable } from 'inversify'

import { IPlaylistService } from '../interfaces/IPlaylistService'
import { IPlaylistRepository } from '../interfaces/IPlaylistRepository'
import { TYPES } from '../../../types/const'
import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors } from '../../../types/common'
import { ImportPlaylistsDTO } from '../dtos/ImportPlaylistsDTO'
import { GetPlaylistsDTO } from '../dtos/GetPlaylistsDTO'
import { IStreamingRepository } from '../../streaming/interfaces/IStreamingRepository'
import { ExportResultDTO } from '../dtos/ExportResultDTO'
import { IMusicImporter } from '../interfaces/IMusicImporter'
@injectable()
export class PlaylistService implements IPlaylistService {
  @inject(TYPES.PlaylistRepository) private playlistRepository: IPlaylistRepository
  @inject(TYPES.StreamingRepository) private streamingRepository: IStreamingRepository
  @inject(TYPES.MusicImporter) private musicImporter: IMusicImporter

  async createPlayList(playlist: CreatePlaylistDTO) {
    const newPlaylist = await this.playlistRepository.createPlaylist(playlist)

    if (!newPlaylist) {
      return new ErrorDTO(Errors.PLAYLIST_CREATE_ERROR)
    }

    return newPlaylist
  }

  async getPlaylistById(id: number) {
    const playlist = await this.playlistRepository.getPlaylistById(id)

    if (!playlist) {
      return null
    }

    return playlist
  }

  async getPlaylistByExternalId(externalId: string) {
    return await this.playlistRepository.getPlaylistByExternalId(externalId)
  }

  async getUserPlaylists(userId: number) {
    return (await this.playlistRepository.getPlaylistsByUserId(userId)) || []
  }

  async importPlaylists(toExport: ImportPlaylistsDTO) {
    const { userId } = toExport

    const streaming = await this.streamingRepository.getStreaming(toExport.userId, toExport.streamingType)

    if (!streaming) {
      return new ErrorDTO(Errors.STREAMING_NOT_FOUND)
    }

    const credentials = new GetPlaylistsDTO({
      token: streaming.token || '',
      refreshToken: streaming.reefresh_token || '',
    })

    const result = await this.musicImporter.importPlaylists({
      userId,
      credentials,
      streamingId: streaming.id,
      streamingType: streaming.type,
    })

    return new ExportResultDTO(result)
  }
}
