import { inject, injectable } from 'inversify'

import { IStreamingService } from '../interfaces/IStreamingService'
import { CreateStreamingDTO } from '../dtos/CreateStreamingDTO'
import { TYPES } from '../../../types/const'
import { IStreamingRepository } from '../interfaces/IStreamingRepository'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors } from '../../../types/common'

@injectable()
export class StreamingService implements IStreamingService {
  @inject(TYPES.StreamingRepository) private streamingRepository: IStreamingRepository
  async createSreaming(steamingData: CreateStreamingDTO) {
    const streaming = await this.streamingRepository.createSreaming(steamingData)

    if (!streaming) {
      return new ErrorDTO(Errors.STREAMING_CREATE_ERROR)
    }

    return streaming
  }
}
