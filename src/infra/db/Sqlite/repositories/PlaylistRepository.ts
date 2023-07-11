import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'

import { UserEntity } from '../entities/UserEntity'
import { TYPES } from '../../../../types/const'
import { Converter } from '../../../../types/common'
import { getRepository } from '../SetupConnection'
import { IPlaylistRepository } from '../../../../modules/music/interfaces/IPlaylistRepository'
import { CreatePlaylistDTO } from '../../../../modules/music/dtos/CreatePlaylistDTO'
import { PlaylistEntity } from '../entities/PlaylistEntity'
import { Playlist } from '../../../../modules/music/entities/Playlist'

@injectable()
export class PlaylistRepository implements IPlaylistRepository {
  @inject(TYPES.PlaylistEntityConverter) private entityConverter: Converter<PlaylistEntity, Playlist>
  repository: Repository<PlaylistEntity>
  userRepository: Repository<UserEntity>
  constructor() {
    this.repository = getRepository(PlaylistEntity)
    this.userRepository = getRepository(UserEntity)
  }

  async createPlaylist(playlistData: CreatePlaylistDTO) {
    const user = await this.userRepository.findOneBy({ id: playlistData.userId })

    if (!user) {
      return null
    }

    const playlist = new PlaylistEntity()
    playlist.name = playlistData.name
    playlist.external_id = playlistData.externalId
    playlist.user = user

    const newPlaylist = await this.repository.save(playlist)

    if (!newPlaylist) {
      return null
    }

    return this.entityConverter.from(newPlaylist)
  }

  async getPlaylistById(id: number): Promise<Playlist | null> {
    const playlist = await this.repository.findOneBy({ id })

    if (!playlist) {
      return null
    }

    return this.entityConverter.from(playlist)
  }

  async getPlaylistsByUserId(userId: number): Promise<Playlist[]> {
    const playlists =
      (await this.repository.find({
        where: { user: { id: userId } },
      })) || []

    return playlists.map(this.entityConverter.from)
  }

  async getPlaylistByExternalId(externalId: string): Promise<Playlist | null> {
    const playlist = await this.repository.findOneBy({ external_id: externalId })

    if (!playlist) {
      return null
    }

    return this.entityConverter.from(playlist)
  }
}