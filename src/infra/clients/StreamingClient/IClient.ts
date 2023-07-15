import { StreamingCredentialsDTO } from '../../../modules/music/dtos/StreamingCredentialsDTO'
import { ExternalPlaylistDTO } from '../../../modules/music/dtos/ExternalPlaylistDTO'
import { StreamingClientConfig } from '../../../modules/music/clients/IStreamingClient'
import { ExternalTrackDTO } from '../../../modules/music/dtos/TrackPlaylistDTO'

export interface IClient {
  getConfig(): StreamingClientConfig,
  getPlaylists(credentials: StreamingCredentialsDTO, offset: number): Promise<ExternalPlaylistDTO[]>,
  getTracksByPlaylist(
    credentials: StreamingCredentialsDTO,
    data: { playlistId: string, offset: number },
  ): Promise<ExternalTrackDTO[]>,
}
