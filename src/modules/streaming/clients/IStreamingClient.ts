import { StreamingCredentialsDTO } from '../../music/dtos/StreamingCredentialsDTO'
import { ExternalPlaylistDTO } from '../../music/dtos/ExternalPlaylistDTO'
import { ContextStrategy, EStreamingType } from '../../../types/common'
import { ExternalTrackDTO } from '../../music/dtos/TrackPlaylistDTO'
import { CreateStreamingTokenDTO } from '../dtos/CreateStreamingTokenDTO'
import { StreamingPrepareResultDTO } from '../dtos/StreamingPrepareResultDTO'

export interface IStreamingClient extends ContextStrategy<EStreamingType, Partial<[StreamingCredentialsDTO]>> {
  prepare(): Promise<StreamingPrepareResultDTO>,
  getConfig(): StreamingClientConfig,
  getPlaylists(offset: number): Promise<ExternalPlaylistDTO[]>,
  getTracksByPlaylist(data: { playlistId: string, offset: number }): Promise<ExternalTrackDTO[]>,
  getLoginUrl(state: string): string | null,
  getToken(code: string): Promise<CreateStreamingTokenDTO | null>,
}

export type StreamingClientConfig = {
  playlistsLimit: number,
}

export enum EPrepareResult {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
