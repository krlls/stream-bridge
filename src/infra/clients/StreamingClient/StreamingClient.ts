import { inject, injectable } from 'inversify'

import { IStreamingClient } from '../../../modules/streaming/clients/IStreamingClient'
import { StreamingCredentialsDTO } from '../../../modules/music/dtos/StreamingCredentialsDTO'
import { ExternalPlaylistDTO } from '../../../modules/music/dtos/ExternalPlaylistDTO'
import { TYPES } from '../../../types/const'
import { EStreamingType, Factory } from '../../../types/common'
import { IClient } from './IClient'
import { strategy } from '../../../utils/decorators'
import { ExternalTrackDTO } from '../../../modules/music/dtos/TrackPlaylistDTO'
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
    return this.client.prepare(this.credentials)
  }

  async getPlaylists(offset: number): Promise<ExternalPlaylistDTO[]> {
    return this.client.getPlaylists(offset)
  }

  async getTracksByPlaylist(data: { playlistId: string, offset: number }): Promise<ExternalTrackDTO[]> {
    return this.client.getTracksByPlaylist(data)
  }

  async getLoginUrl(state: string): Promise<string | null> {
    return this.client.getLoginUrl(state)
  }

  async getToken(code: string): Promise<CreateStreamingTokenDTO | null> {
    return this.client.getToken(code)
  }
}
