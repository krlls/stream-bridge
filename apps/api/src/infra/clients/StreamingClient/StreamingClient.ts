import { inject, injectable } from 'inversify'

import { IStreamingClient } from '../../../modules/streaming/clients/IStreamingClient'
import { StreamingCredentialsDTO } from '../../../modules/music/dtos/StreamingCredentialsDTO'
import { ExternalPlaylistDTO } from '../../../modules/music/dtos/ExternalPlaylistDTO'
import { TYPES } from '../../../types/const'
import { EStreamingType, Factory } from '../../../types/common'
import { IClient } from './IClient'
import { strategy } from '../../../utils/decorators'
import { ExternalTrackDTO } from '../../../modules/music/dtos/ExternalTrackDTO'
import { CreateStreamingTokenDTO } from '../../../modules/streaming/dtos/CreateStreamingTokenDTO'
import { StreamingPrepareResultDTO } from '../../../modules/streaming/dtos/StreamingPrepareResultDTO'

@injectable()
@strategy('client', 'set')
export class StreamingClient implements IStreamingClient {
  @inject(TYPES.ClientApiFactory) private apiFactory: Factory<IClient, [EStreamingType]>

  private client: IClient
  private credentials: StreamingCredentialsDTO

  set(type: EStreamingType, data: StreamingCredentialsDTO) {
    this.client = this.apiFactory(type)
    this.credentials = data
  }

  getConfig() {
    return this.client.getConfig()
  }

  async prepare(): Promise<StreamingPrepareResultDTO> {
    const prepareResult = await this.client.prepare(this.credentials)

    if (prepareResult.data) {
      this.credentials = new StreamingCredentialsDTO({
        token: prepareResult.data.token,
        refreshToken: prepareResult.data.refreshToken,
        expiresIn: prepareResult.data.expiresIn,
        id: this.credentials.streamingId,
        expires: prepareResult.data.expires,
      })
    }

    return prepareResult
  }

  async getPlaylists(offset: number): Promise<ExternalPlaylistDTO[]> {
    return this.client.getPlaylists(offset)
  }

  async getTracksByPlaylist(data: { playlistId: string, offset: number }): Promise<ExternalTrackDTO[]> {
    return this.client.getTracksByPlaylist(data)
  }

  getLoginUrl(state: string): string | null {
    return this.client.getLoginUrl(state)
  }

  async getToken(code: string): Promise<CreateStreamingTokenDTO | null> {
    return this.client.getToken(code)
  }
  async updateToken(): Promise<CreateStreamingTokenDTO | null> {
    return this.client.updateToken(this.credentials.refreshToken)
  }
}
