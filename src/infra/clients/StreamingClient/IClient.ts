import { StreamingCredentialsDTO } from '../../../modules/music/dtos/StreamingCredentialsDTO'
import { ExternalPlaylistDTO } from '../../../modules/music/dtos/ExternalPlaylistDTO'
import { StreamingClientConfig } from '../../../modules/music/clients/IStreamingClient'
import { ExternalTrackDTO } from '../../../modules/music/dtos/TrackPlaylistDTO'
import { CreateStreamingTokenDTO } from '../../../modules/streaming/dtos/CreateStreamingTokenDTO'

export interface IClient {
  getConfig(): StreamingClientConfig,
  getPlaylists(credentials: StreamingCredentialsDTO, offset: number): Promise<ExternalPlaylistDTO[]>,
  getTracksByPlaylist(
    credentials: StreamingCredentialsDTO,
    data: { playlistId: string, offset: number },
  ): Promise<ExternalTrackDTO[]>,
  getLoginUrl(state: string): Promise<string | null>,
  getToken(code: string): Promise<CreateStreamingTokenDTO | null>,
}
