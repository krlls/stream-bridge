import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { TrackDTO } from '../dtos/TrackDto'

export interface IMusicSync {
  exportTracks(credentials: StreamingCredentialsDTO, tracks: TrackDTO[]): Promise<{ total: number, exported: number }>,
}
