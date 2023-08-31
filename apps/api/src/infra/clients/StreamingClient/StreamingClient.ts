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
import { ApiCreatePlaylistDTO } from '../../../modules/music/dtos/ApiCreatePlaylistDTO'
import { ApiFindTrackDto } from '../../../modules/music/dtos/ApiFindTrackDto'

@injectable()
@strategy('client', 'set')
export class StreamingClient implements IStreamingClient {
  @inject(TYPES.ClientApiFactory) private apiFactory: Factory<IClient, [EStreamingType]>

  init: boolean

  private client: IClient
  private credentials: StreamingCredentialsDTO

  set(type: EStreamingType, data: StreamingCredentialsDTO) {
    if (this.client) {
      throw Error('Client already set')
    }

    if (this.credentials) {
      throw Error('Credentials already set')
    }

    this.client = this.apiFactory(type)
    this.credentials = data
    this.init = true
  }

  compareCredentials(credentials: StreamingCredentialsDTO): boolean {
    if (!this.credentials) {
      return false
    }

    return this.credentials.streamingId === credentials.streamingId
  }

  getConfig() {
    return this.client.getConfig()
  }

  async prepare(): Promise<StreamingPrepareResultDTO> {
    const prepareResult = await this.client.prepare(this.credentials)

    if (prepareResult.data) {
      this.updateCredentials(prepareResult.data)
    }

    return prepareResult
  }

  async getPlaylists(offset: number): Promise<ExternalPlaylistDTO[]> {
    return this.client.getPlaylists(offset)
  }

  async getTracksByPlaylist(data: { playlistId: string, offset: number }): Promise<ExternalTrackDTO[]> {
    return this.client.getTracksByPlaylist(data)
  }

  async createPlaylist(data: ApiCreatePlaylistDTO): Promise<ExternalPlaylistDTO | null> {
    return this.client.createPlaylist(data)
  }

  getLoginUrl(state: string): string | null {
    return this.client.getLoginUrl(state)
  }

  async getToken(code: string): Promise<CreateStreamingTokenDTO | null> {
    return this.client.getToken(code)
  }

  async findTrack(data: ApiFindTrackDto): Promise<ExternalTrackDTO[]> {
    return this.client.findTrack(data)
  }

  private updateCredentials(data: CreateStreamingTokenDTO) {
    this.credentials = new StreamingCredentialsDTO({
      id: this.credentials.streamingId,
      token: data.token,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      expires: data.expires,
    })
  }
}
