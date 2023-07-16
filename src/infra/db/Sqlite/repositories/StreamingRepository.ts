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

@injectable()
export class StreamingRepository implements IStreamingRepository {
  @inject(TYPES.StreamingEntityConverter) private streamingEntityConverter: Converter<StreamingEntity, Streaming>
  userRepository: Repository<UserEntity>

  private repository: Repository<StreamingEntity>

  constructor() {
    this.repository = getRepository(StreamingEntity)
    this.userRepository = getRepository(UserEntity)
  }

  async createSreaming(steamingData: CreateStreamingDTO): Promise<Streaming | null> {
    const user = await this.userRepository.findOneBy({ id: steamingData.userId })

    if (!user) {
      return null
    }

    const streamingToSave = new StreamingEntity()

    streamingToSave.type = steamingData.type
    streamingToSave.token = steamingData.token
    streamingToSave.reefresh_token = steamingData.refreshToken
    streamingToSave.user = user

    // user.streamings.push(streamingToSave)

    const streaming = await this.repository.save(streamingToSave)

    if (!streaming) {
      return null
    }

    return this.streamingEntityConverter.from(streaming)
  }

  async getStreaming(userId: number, type: EStreamingType): Promise<Streaming | null> {
    const streaming = await this.repository.findOneBy({ user: { id: userId }, type })

    if (!streaming) {
      return null
    }

    return this.streamingEntityConverter.from(streaming)
  }
}
