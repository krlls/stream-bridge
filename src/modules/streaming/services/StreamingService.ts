import { inject, injectable } from 'inversify'

import { IStreamingService } from '../interfaces/IStreamingService'
import { CreateStreamingDTO } from '../dtos/CreateStreamingDTO'
import { TYPES } from '../../../types/const'
import { IStreamingRepository } from '../interfaces/IStreamingRepository'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors } from '../../../types/common'
import { IStreamingClient } from '../clients/IStreamingClient'
import { LoginUrlDTO } from '../dtos/LoginUrlDTO'
import { CreateLoginUrlDTO } from '../dtos/createLoginUrlDTO'
import { SaveStreamingTokenDTO } from '../dtos/SaveStreamingTokenDTO'

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

  async getLoginUrl(data: CreateLoginUrlDTO) {
    await this.streamingClient.set(data.streamingType)

    const url = await this.streamingClient.getLoginUrl(data.token)

    if (!url) {
      return new ErrorDTO(Errors.CREATE_URL_ERROR)
    }

    return new LoginUrlDTO(url)
  }

  async saveToken(data: SaveStreamingTokenDTO) {
    await this.streamingClient.set(data.streamingType)

    const tokenResp = await this.streamingClient.getToken(data.code)

    if (!tokenResp) {
      return new ErrorDTO(Errors.CREATE_TOKEN_ERROR)
    }

    const streaming = await this.streamingRepository.getStreaming(data.userId, data.streamingType)

    if (!streaming) {
      const createData = new CreateStreamingDTO({
        token: tokenResp.token,
        userId: data.userId,
        refreshToken: tokenResp.refreshToken,
        type: data.streamingType,
        expiresIn: tokenResp.expiresIn,
      })

      const newStreaming = await this.streamingRepository.createSreaming(createData)

      if (!newStreaming) {
        return new ErrorDTO(Errors.STREAMING_CREATE_ERROR)
      }

      return { status: 'created' }
    }

    const updatedStreaming = this.streamingRepository.updateStreamingWithToken(streaming.id, tokenResp)

    if (!updatedStreaming) {
      return new ErrorDTO(Errors.STREAMING_UPDATE_ERROR)
    }

    return { status: 'updated' }
  }
}
