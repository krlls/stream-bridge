import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { EStreamingType, ServiceResultDTO } from '../../../types/common'
import { ImportTracksDTO } from '../dtos/ImportTracksDTO'

export interface IMusicImporter {
  importPlaylists(data: {
    userId: number,
    streamingId: number,
    streamingType: EStreamingType,
    credentials: StreamingCredentialsDTO,
  }): Promise<ServiceResultDTO<{ exported: number, saved: number, deleted: number }>>,

  importTracksByPlaylists(
    credentials: StreamingCredentialsDTO,
    data: ImportTracksDTO[],
  ): Promise<ServiceResultDTO<{ exported: number, saved: number }>>,
}
