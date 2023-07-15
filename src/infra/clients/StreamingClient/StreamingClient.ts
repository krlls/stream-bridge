import { inject, injectable } from 'inversify'

import { IStreamingClient } from '../../../modules/music/clients/IStreamingClient'
import { StreamingCredentialsDTO } from '../../../modules/music/dtos/StreamingCredentialsDTO'
import { ExternalPlaylistDTO } from '../../../modules/music/dtos/ExternalPlaylistDTO'
import { TYPES } from '../../../types/const'
import { EStreamingType, Factory } from '../../../types/common'
import { IClient } from './IClient'
import { strategy } from '../../../utils/decorators'
import { ExternalTrackDTO } from '../../../modules/music/dtos/TrackPlaylistDTO'

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

  async getPlaylists(offset: number): Promise<ExternalPlaylistDTO[]> {
    return this.client.getPlaylists(this.credentials, offset)
  }

  async getTracksByPlaylist(
    credentials: StreamingCredentialsDTO,
    data: { playlistId: string, offset: number },
  ): Promise<ExternalTrackDTO[]> {
    return this.client.getTracksByPlaylist(credentials, data)
  }
}
