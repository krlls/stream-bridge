import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { ExternalPlaylistDTO } from '../dtos/ExternalPlaylistDTO'
import { ContextStrategy, EStreamingType } from '../../../types/common'
import { ExternalTrackDTO } from '../dtos/TrackPlaylistDTO'

export interface IStreamingClient extends ContextStrategy<EStreamingType, [StreamingCredentialsDTO]> {
  getConfig(): StreamingClientConfig,
  getPlaylists(offset: number): Promise<ExternalPlaylistDTO[]>,
  getTracksByPlaylist(
    credentials: StreamingCredentialsDTO,
    data: { playlistId: string, offset: number },
  ): Promise<ExternalTrackDTO[]>,
}

export type StreamingClientConfig = {
  playlistsLimit: number,
}
