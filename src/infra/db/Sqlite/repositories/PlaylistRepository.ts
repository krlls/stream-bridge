import { inject, injectable } from 'inversify'
import { In, Not, Repository } from 'typeorm'

import { UserEntity } from '../entities/UserEntity'
import { TYPES } from '../../../../types/const'
import { Converter, EStreamingType, Uid } from '../../../../types/common'
import { getRepository } from '../SetupConnection'
import { IPlaylistRepository } from '../../../../modules/music/interfaces/IPlaylistRepository'
import { CreatePlaylistDTO } from '../../../../modules/music/dtos/CreatePlaylistDTO'
import { PlaylistEntity } from '../entities/PlaylistEntity'
import { Playlist } from '../../../../modules/music/entities/Playlist'
import { StreamingEntity } from '../entities/StreamingEntity'

@injectable()
export class PlaylistRepository implements IPlaylistRepository {
  @inject(TYPES.PlaylistEntityConverter) private entityConverter: Converter<PlaylistEntity, Playlist>
  repository: Repository<PlaylistEntity>
  userRepository: Repository<UserEntity>
  streamingRepository: Repository<StreamingEntity>
  constructor() {
    this.repository = getRepository(PlaylistEntity)
    this.userRepository = getRepository(UserEntity)
    this.streamingRepository = getRepository(StreamingEntity)
  }

  async createPlaylists(playlistData: CreatePlaylistDTO[]) {
    if (!playlistData.length) {
      return []
    }

    const { user, streaming } = await this.getPlaylistRelations({
      streamingId: playlistData[0].streamingId,
      userId: playlistData[0].userId,
    })

    if (!user || !streaming) {
      return []
    }

    const playlists = playlistData.map((playlist) =>
      this.convertPlaylist({
        user,
        streaming,
        playlistData: playlist,
      }),
    )

    const newPlaylists = await this.repository.save(playlists)

    if (!newPlaylists) {
      return []
    }

    return newPlaylists.map(this.entityConverter.from)
  }

  async createPlaylist(playlistData: CreatePlaylistDTO) {
    const { user, streaming } = await this.getPlaylistRelations({
      streamingId: playlistData.streamingId,
      userId: playlistData.userId,
    })

    if (!user || !streaming) {
      return null
    }

    const playlist = this.convertPlaylist({ user, streaming, playlistData })

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

  async upsertPlaylists(playlistData: CreatePlaylistDTO[]): Promise<number> {
    if (!playlistData.length) {
      return 0
    }

    const { user, streaming } = await this.getPlaylistRelations({
      streamingId: playlistData[0].streamingId,
      userId: playlistData[0].userId,
    })

    if (!user || !streaming) {
      return 0
    }

    const convertedPlaylists = playlistData.map((playlist) =>
      this.convertPlaylist({ user, streaming, playlistData: playlist }),
    )

    const result = await this.repository.upsert(convertedPlaylists, ['external_id', 'streaming'])

    if (!result) {
      return 0
    }

    return result.generatedMaps.length
  }

  async purgeMismatchedPlaylistsByImportId(data: {
    streamingType: EStreamingType,
    importId: Uid,
    userId: number,
  }): Promise<{ deleted: number }> {
    const entities = await this.repository.find({
      relations: ['streaming', 'user'],
      where: {
        import_id: Not(data.importId),
        streaming: { type: data.streamingType },
        user: { id: data.userId },
      },
    })
    const deleted = await this.repository.delete({ id: In(entities.map((p) => p.id)) })

    return { deleted: deleted.affected || 0 }
  }

  private async getPlaylistRelations(data: { userId: number, streamingId: number }) {
    const [user, streaming] = await Promise.all([
      this.userRepository.findOneBy({ id: data.userId }),
      this.streamingRepository.findOneBy({ id: data.streamingId }),
    ])

    return { user, streaming }
  }

  private convertPlaylist({
    user,
    streaming,
    playlistData,
  }: {
    user: UserEntity,
    streaming: StreamingEntity,
    playlistData: CreatePlaylistDTO,
  }) {
    const playlist = new PlaylistEntity()

    playlist.user = user
    playlist.streaming = streaming
    playlist.name = playlistData.name
    playlist.external_id = playlistData.externalId
    playlist.import_id = playlistData.importId

    return playlist
  }
}
