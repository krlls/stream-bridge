import { StreamingCredentialsDTO } from '../../../modules/music/dtos/StreamingCredentialsDTO'
import { ExternalPlaylistDTO } from '../../../modules/music/dtos/ExternalPlaylistDTO'
import { StreamingClientConfig } from '../../../modules/streaming/clients/IStreamingClient'
import { ExternalTrackDTO } from '../../../modules/music/dtos/ExternalTrackDTO'
import { CreateStreamingTokenDTO } from '../../../modules/streaming/dtos/CreateStreamingTokenDTO'
import { StreamingPrepareResultDTO } from '../../../modules/streaming/dtos/StreamingPrepareResultDTO'

export interface IClient {
  prepare(credentials: StreamingCredentialsDTO): Promise<StreamingPrepareResultDTO>,
  getConfig(): StreamingClientConfig,
  getPlaylists(offset: number): Promise<ExternalPlaylistDTO[]>,
  getTracksByPlaylist(data: { playlistId: string, offset: number }): Promise<ExternalTrackDTO[]>,
  getLoginUrl(state: string): string | null,
  getToken(code: string): Promise<CreateStreamingTokenDTO | null>,
}
