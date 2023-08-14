import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'

import { TYPES } from '../../../../types/const'
import { Converter, EStreamingType } from '../../../../types/common'
import { getRepository } from '../SetupConnection'
import { IStreamingRepository } from '../../../../modules/streaming/interfaces/IStreamingRepository'
import { StreamingEntity } from '../entities/StreamingEntity'
import { UserEntity } from '../entities/UserEntity'
import { Streaming } from '../../../../modules/streaming/entities/Streaming'
import { CreateStreamingDTO } from '../../../../modules/streaming/dtos/CreateStreamingDTO'
import { TrackEntity } from '../entities/TrackEntity'
import { UpdateStreamingTokenDTO } from '../../../../modules/streaming/dtos/UpdateStreamingTokenDTO'

@injectable()
export class StreamingRepository implements IStreamingRepository {
  @inject(TYPES.StreamingEntityConverter)
  private streamingEntityConverter: Converter<StreamingEntity, Streaming>
  userRepository: Repository<UserEntity>

  private repository: Repository<StreamingEntity>

  constructor() {
    this.repository = getRepository(StreamingEntity)
    this.userRepository = getRepository(UserEntity)
  }

  async createStreaming(steamingData: CreateStreamingDTO): Promise<Streaming | null> {
    const user = await this.userRepository.findOneBy({
      id: steamingData.userId,
    })

    if (!user) {
      return null
    }

    const streamingToSave = new StreamingEntity()

    streamingToSave.type = steamingData.type
    streamingToSave.token = steamingData.token
    streamingToSave.refresh_token = steamingData.refreshToken
    streamingToSave.expiresIn = steamingData.expiresIn
    streamingToSave.user = user

    const streaming = await this.repository.save(streamingToSave)

    if (!streaming) {
      return null
    }

    return this.streamingEntityConverter.from(streaming)
  }

  async getStreaming(userId: number, type: EStreamingType): Promise<Streaming | null> {
    const streaming = await this.repository.findOneBy({
      user: { id: userId },
      type,
    })

    if (!streaming) {
      return null
    }

    return this.streamingEntityConverter.from(streaming)
  }

  async updateStreamingWithToken(streamingId: number, data: UpdateStreamingTokenDTO): Promise<Streaming | null> {
    const streaming = await this.repository.findOneBy({ id: streamingId })

    if (!streaming) {
      return null
    }

    streaming.token = data.token
    streaming.refresh_token = data.refreshToken
    streaming.expiresIn = data.expiresIn

    const result = await this.repository.save(streaming)

    if (!result) {
      return null
    }

    return this.streamingEntityConverter.from(result)
  }

  async getUserStreamings(userId: number): Promise<Streaming[]> {
    const resStreamings = await this.repository
      .createQueryBuilder('s')
      .loadRelationCountAndMap('s.playlistsCount', 's.playlists')
      .addSelect((subQuery) => {
        return subQuery.select('COUNT(t.id)', 'tracksCount').from(TrackEntity, 't').where('t.streamingId = s.id')
      }, 'tracksCount')
      .where('s.userid = :userid', { userid: userId })
      .getRawAndEntities()

    if (!resStreamings) {
      return []
    }

    const streamings: StreamingEntity[] = resStreamings.entities.map(
      (e, i) => ({ ...e, tracksCount: resStreamings.raw[i]?.tracksCount as number }) as StreamingEntity,
    )

    return streamings.map(this.streamingEntityConverter.from)
  }

  async removeUserStreamingByType(userId: number, streamingType: EStreamingType): Promise<number> {
    const result = await this.repository.delete({
      user: { id: userId },
      type: streamingType,
    })

    if (!result.affected) {
      return 0
    }

    return result.affected
  }
}
