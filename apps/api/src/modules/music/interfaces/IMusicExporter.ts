import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { ApiExportTracksDto } from '../dtos/ApiExportTracksDto'
import { ServiceResultDTO } from '../../../types/common'

export interface IMusicExporter {
  exportTracks(
    toExport: ApiExportTracksDto,
    credentials: StreamingCredentialsDTO,
  ): Promise<ServiceResultDTO<{ total: number, exported: number, notFoundIds: number[] }>>,
}
