import { inject, injectable } from 'inversify'

import { IPlaylistService } from '../interfaces/IPlaylistService'
import { IPlaylistRepository } from '../interfaces/IPlaylistRepository'
import { TYPES } from '../../../types/const'
import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors } from '../../../types/common'
import { ExporlPlaylistsDTO } from '../dtos/ExporlPlaylistsDTO'
import { IStreamingClient } from '../clients/IStreamingClient'
import { GetPlaylistsDTO } from '../dtos/GetPlaylistsDTO'
import { IStreamingRepository } from '../../streaming/interfaces/IStreamingRepository'

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

  async exportPlaylists(toExport: ExporlPlaylistsDTO) {
    this.streamingClient.set(toExport.streamingType)

    const streaming = await this.streamingRepository.getStreaming(toExport.userId, toExport.streamingType)

    if (!streaming) {
      return new ErrorDTO(Errors.STREAMING_NOT_FOUND)
    }

    const getPlaylists = new GetPlaylistsDTO({
      tocken: streaming.token || '',
      refreshToken: streaming.reefresh_token || '',
    })
    const playlists = (await this.streamingClient.getPlaylists(getPlaylists)) || []

    await Promise.all(
      playlists.map((p) =>
        this.playlistRrpository.createPlaylist(
          p.toCreate({
            userId: toExport.userId,
            streamingId: streaming.id,
          }),
        ),
      ),
    )

    return playlists.length
  }
}
