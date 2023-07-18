import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { EStreamingType, ServiceResultDTO } from '../../../types/common'
import { GetTracksByPlaylistDTO } from '../dtos/GetTracksByPlaylistDTO'

export interface IMusicImporter {
  importPlaylists(data: {
    userId: number,
    streamingId: number,
    streamingType: EStreamingType,
    credentials: StreamingCredentialsDTO,
  }): Promise<ServiceResultDTO<{ exported: number, saved: number }>>,

  importTracksByPlaylists(
    credentials: StreamingCredentialsDTO,
    data: GetTracksByPlaylistDTO[],
  ): Promise<ServiceResultDTO<{ exported: number, saved: number }>>,
}
