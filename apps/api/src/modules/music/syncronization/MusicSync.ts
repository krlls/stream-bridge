import { injectable } from 'inversify'

import { Errors, EStreamingType } from '../../../types/common'
import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { ImportLogger } from '../../../utils/logger'
import { EPrepareResult, IStreamingClient } from '../../streaming/clients/IStreamingClient'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { CreateStreamingTokenDTO } from '../../streaming/dtos/CreateStreamingTokenDTO'
import { IStreamingRepository } from '../../streaming/interfaces/IStreamingRepository'

@injectable()
export abstract class MusicSync {
  protected abstract streamingClient: IStreamingClient
  protected abstract streamingRepository: IStreamingRepository

  protected async prepareClient(type: EStreamingType, credentials: StreamingCredentialsDTO) {
    ImportLogger.info('prepareClient', type)

    if (!this.streamingClient.init) {
      this.streamingClient.set(type, credentials)
    }

    if (this.streamingClient.init && !this.streamingClient.compareCredentials(credentials)) {
      throw Error('Credentials not compare')
    }

    const prepareRes = await this.streamingClient.prepare()

    if (prepareRes.result === EPrepareResult.ERROR) {
      ImportLogger.error('prepareClient', type, 'error')

      return new ErrorDTO(Errors.PREPARE_CLIENT_ERROR)
    }

    if (prepareRes.data) {
      await this.updateStreaming(credentials.streamingId, prepareRes.data)
    }

    return
  }

  protected async updateStreaming(streamingId: number, data: CreateStreamingTokenDTO) {
    const result = await this.streamingRepository.updateStreamingWithToken(streamingId, data)

    result
      ? ImportLogger.info('updateStreaming', streamingId, 'success')
      : ImportLogger.error('updateStreaming', streamingId)
  }
}
