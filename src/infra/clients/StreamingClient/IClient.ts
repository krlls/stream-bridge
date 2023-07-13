import { GetPlaylistsDTO } from '../../../modules/music/dtos/GetPlaylistsDTO'
import { ExternalPlaylistDTO } from '../../../modules/music/dtos/ExternalPlaylistDTO'

export interface IClient {
  getPlaylists(data: GetPlaylistsDTO): Promise<ExternalPlaylistDTO[]>,
}
