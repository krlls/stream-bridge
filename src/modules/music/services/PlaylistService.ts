import { inject, injectable } from 'inversify'

import { IPlaylistService } from '../interfaces/IPlaylistService'
import { IPlaylistRepository } from '../interfaces/IPlaylistRepository'
import { TYPES } from '../../../types/const'
import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors } from '../../../types/common'

@injectable()
export class PlaylistService implements IPlaylistService {
  @inject(TYPES.PlaylistRepository) private playlistRrpository: IPlaylistRepository

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
}
