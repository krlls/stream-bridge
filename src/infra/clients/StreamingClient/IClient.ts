import { GetPlaylistsDTO } from '../../../modules/music/dtos/GetPlaylistsDTO'
import { ExternalPlaylistDTO } from '../../../modules/music/dtos/ExternalPlaylistDTO'
import { StreamingClientConfig } from '../../../modules/music/clients/IStreamingClient'

export interface IClient {
  getConfig(): StreamingClientConfig,
  getPlaylists(credentials: GetPlaylistsDTO, offset: number): Promise<ExternalPlaylistDTO[]>,
}
