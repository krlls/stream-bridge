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
import { CreateStreamingTokenDTO } from '../../../../modules/streaming/dtos/CreateStreamingTokenDTO'

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

  async updateStreamingWithToken(streamingId: number, data: CreateStreamingTokenDTO): Promise<Streaming | null> {
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
    const streamings = await this.repository
      .createQueryBuilder('streaming_entity')
      .loadRelationCountAndMap('streaming_entity.playlistsCount', 'streaming_entity.playlists')
      .loadRelationCountAndMap('streaming_entity.tracksCount', 'streaming_entity.tracks')
      .where('streaming_entity.userid = :userid', { userid: userId })
      .getMany()

    if (!streamings) {
      return []
    }

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
