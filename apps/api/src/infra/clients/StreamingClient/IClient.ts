import { StreamingCredentialsDTO } from '../../../modules/music/dtos/StreamingCredentialsDTO'
import { ExternalPlaylistDTO } from '../../../modules/music/dtos/ExternalPlaylistDTO'
import { StreamingClientConfig } from '../../../modules/streaming/clients/IStreamingClient'
import { ExternalTrackDTO } from '../../../modules/music/dtos/ExternalTrackDTO'
import { CreateStreamingTokenDTO } from '../../../modules/streaming/dtos/CreateStreamingTokenDTO'
import { StreamingPrepareResultDTO } from '../../../modules/streaming/dtos/StreamingPrepareResultDTO'
import { ApiCreatePlaylistDTO } from '../../../modules/music/dtos/ApiCreatePlaylistDTO'
import { ApiFindTrackDto } from '../../../modules/music/dtos/ApiFindTrackDto'

export interface IClient {
  prepare(credentials: StreamingCredentialsDTO): Promise<StreamingPrepareResultDTO>,
  getConfig(): StreamingClientConfig,
  getPlaylists(offset: number): Promise<ExternalPlaylistDTO[]>,
  getTracksByPlaylist(data: { playlistId: string, offset: number }): Promise<ExternalTrackDTO[]>,
  getLoginUrl(state: string): string | null,
  createPlaylist(data: ApiCreatePlaylistDTO): Promise<ExternalPlaylistDTO | null>,
  getToken(code: string): Promise<CreateStreamingTokenDTO | null>,
  findTrack(data: ApiFindTrackDto): Promise<ExternalTrackDTO[]>,
  addTrackToPlaylist(trackIds: string[], playlistId: string): Promise<boolean>,
}
