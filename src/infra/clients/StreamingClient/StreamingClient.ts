import { inject, injectable } from 'inversify'

import { IStreamingClient } from '../../../modules/music/clients/IStreamingClient'
import { GetPlaylistsDTO } from '../../../modules/music/dtos/GetPlaylistsDTO'
import { ExternalPlaylistDTO } from '../../../modules/music/dtos/ExternalPlaylistDTO'
import { TYPES } from '../../../types/const'
import { EStreamingType, Factory } from '../../../types/common'
import { IClient } from './IClient'
import { strategy } from '../../../utils/decorators'

@injectable()
@strategy('client', 'set')
export class StreamingClient implements IStreamingClient {
  private client: IClient
  private credentials: GetPlaylistsDTO
  @inject(TYPES.ClientApiFactory) private apiFactory: Factory<IClient, [EStreamingType]>

  set(type: EStreamingType, data: GetPlaylistsDTO) {
    this.client = this.apiFactory(type)
    this.credentials = data
  }

  getConfig() {
    return this.client.getConfig()
  }

  async getPlaylists(offset: number): Promise<ExternalPlaylistDTO[]> {
    return this.client.getPlaylists(this.credentials, offset)
  }
}
