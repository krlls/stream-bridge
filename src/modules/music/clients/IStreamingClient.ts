import { GetPlaylistsDTO } from '../dtos/GetPlaylistsDTO'
import { ExternalPlaylistDTO } from '../dtos/ExternalPlaylistDTO'
import { ContextStrategy, EStreamingType } from '../../../types/common'

export interface IStreamingClient extends ContextStrategy<EStreamingType, [GetPlaylistsDTO]> {
  getConfig(): StreamingClientConfig,
  getPlaylists(offset: number): Promise<ExternalPlaylistDTO[]>,
}

export type StreamingClientConfig = {
  playlistsLimit: number,
}
