import { inject, injectable } from 'inversify'

import { IStreamingService } from '../interfaces/IStreamingService'
import { CreateStreamingDTO } from '../dtos/CreateStreamingDTO'
import { TYPES } from '../../../types/const'
import { IStreamingRepository } from '../interfaces/IStreamingRepository'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors, EStreamingType } from '../../../types/common'
import { IStreamingClient } from '../../music/clients/IStreamingClient'
import { LoginUrlDTO } from '../dtos/LoginUrlDTO'

@injectable()
export class StreamingService implements IStreamingService {
  @inject(TYPES.StreamingRepository) private streamingRepository: IStreamingRepository
  @inject(TYPES.Client) private streamingClient: IStreamingClient

  async createStreaming(steamingData: CreateStreamingDTO) {
    const streaming = await this.streamingRepository.createSreaming(steamingData)

    if (!streaming) {
      return new ErrorDTO(Errors.STREAMING_CREATE_ERROR)
    }

    return streaming
  }

  async getLoginUrl(streamingType: EStreamingType) {
    await this.streamingClient.set(streamingType)

    const url = await this.streamingClient.getLoginUrl()

    if (!url) {
      return new ErrorDTO(Errors.CREATE_URL_ERROR)
    }

    return new LoginUrlDTO(url)
  }
}
