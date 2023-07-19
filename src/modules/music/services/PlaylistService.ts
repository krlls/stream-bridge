import { inject, injectable } from 'inversify'

import { IPlaylistService } from '../interfaces/IPlaylistService'
import { IPlaylistRepository } from '../interfaces/IPlaylistRepository'
import { TYPES } from '../../../types/const'
import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors } from '../../../types/common'
import { ImportMediaDTO } from '../dtos/ImportMediaDTO'
import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { IStreamingRepository } from '../../streaming/interfaces/IStreamingRepository'
import { ImportResultDTO } from '../dtos/ImportResultDTO'
import { IMusicImporter } from '../interfaces/IMusicImporter'
import { isServiceError } from '../../../utils/errors'

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
      return new ErrorDTO(Errors.PLAYLIST_NOT_FOUND)
    }

    return playlist
  }

  async getPlaylistByExternalId(externalId: string) {
    return await this.playlistRepository.getPlaylistByExternalId(externalId)
  }

  async getUserPlaylists(userId: number) {
    return (await this.playlistRepository.getPlaylistsByUserId(userId)) || []
  }

  async importPlaylists(toImport: ImportMediaDTO) {
    const { userId } = toImport

    const streaming = await this.streamingRepository.getStreaming(toImport.userId, toImport.streamingType)

    if (!streaming) {
      return new ErrorDTO(Errors.STREAMING_NOT_FOUND)
    }

    const { expiresIn, refresh_token, token } = streaming

    if (!expiresIn || !refresh_token || !token) {
      return new ErrorDTO(Errors.WRONG_CREDENTIALS)
    }

    const credentials = new StreamingCredentialsDTO({
      token,
      expiresIn,
      refreshToken: refresh_token,
    })

    const result = await this.musicImporter.importPlaylists({
      userId,
      credentials,
      streamingId: streaming.id,
      streamingType: streaming.type,
    })

    if (isServiceError(result)) {
      return result
    }

    return new ImportResultDTO(result)
  }
}
