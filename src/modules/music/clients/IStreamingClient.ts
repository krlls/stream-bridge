import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { ExternalPlaylistDTO } from '../dtos/ExternalPlaylistDTO'
import { ContextStrategy, EStreamingType } from '../../../types/common'
import { ExternalTrackDTO } from '../dtos/TrackPlaylistDTO'
import { CreateStreamingTokenDTO } from '../../streaming/dtos/CreateStreamingTokenDTO'

export interface IStreamingClient extends ContextStrategy<EStreamingType, Partial<[StreamingCredentialsDTO]>> {
  getConfig(): StreamingClientConfig,
  getPlaylists(offset: number): Promise<ExternalPlaylistDTO[]>,
  getTracksByPlaylist(
    credentials: StreamingCredentialsDTO,
    data: { playlistId: string, offset: number },
  ): Promise<ExternalTrackDTO[]>,
  getLoginUrl(state: string): Promise<string | null>,
  getToken(code: string): Promise<CreateStreamingTokenDTO | null>,
}

export type StreamingClientConfig = {
  playlistsLimit: number,
}
