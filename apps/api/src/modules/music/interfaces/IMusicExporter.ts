import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { EStreamingType, ServiceResultDTO } from '../../../types/common'
import { Track } from '../entities/Track'

export interface IMusicExporter {
  exportTracks(
    type: EStreamingType,
    credentials: StreamingCredentialsDTO,
    tracks: Track[],
  ): Promise<ServiceResultDTO<{ total: number, exported: number, notFoundIds: number[] }>>,
}
