import { GetPlaylistsDTO } from '../dtos/GetPlaylistsDTO'
import { ExternalPlaylistDTO } from '../dtos/ExternalPlaylistDTO'
import { ContextStrategy, EStreamingType } from '../../../types/common'

export interface IStreamingClient extends ContextStrategy<EStreamingType> {
  getPlaylists(data: GetPlaylistsDTO): Promise<ExternalPlaylistDTO[]>,
}
