import { StreamingCredentialsDTO } from '../../music/dtos/StreamingCredentialsDTO'
import { ExternalPlaylistDTO } from '../../music/dtos/ExternalPlaylistDTO'
import { ContextStrategy, EStreamingType } from '../../../types/common'
import { ExternalTrackDTO } from '../../music/dtos/ExternalTrackDTO'
import { CreateStreamingTokenDTO } from '../dtos/CreateStreamingTokenDTO'
import { StreamingPrepareResultDTO } from '../dtos/StreamingPrepareResultDTO'
import { ApiCreatePlaylistDTO } from '../../music/dtos/ApiCreatePlaylistDTO'

export interface IStreamingClient extends ContextStrategy<EStreamingType, Partial<[StreamingCredentialsDTO]>> {
  init: boolean,
  set(type: EStreamingType, data: StreamingCredentialsDTO): void,
  prepare(): Promise<StreamingPrepareResultDTO>,
  getConfig(): StreamingClientConfig,
  getPlaylists(offset: number): Promise<ExternalPlaylistDTO[]>,
  getTracksByPlaylist(data: { playlistId: string, offset: number }): Promise<ExternalTrackDTO[]>,
  createPlaylist(data: ApiCreatePlaylistDTO): Promise<ExternalPlaylistDTO | null>,
  getLoginUrl(state: string): string | null,
  getToken(code: string): Promise<CreateStreamingTokenDTO | null>,
  compareCredentials(credentials: StreamingCredentialsDTO): boolean,
}

export type StreamingClientConfig = {
  playlistsLimit: number,
}

export enum EPrepareResult {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
