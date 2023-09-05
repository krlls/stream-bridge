import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { ApiExportTracksDto } from '../dtos/ApiExportTracksDto'
import { ServiceResultDTO } from '../../../types/common'
import { ApiExportPlaylistDto } from '../dtos/ApiExportPlaylistDto'

export interface IMusicExporter {
  exportTracks(
    toExport: ApiExportTracksDto,
    credentials: StreamingCredentialsDTO,
  ): Promise<ServiceResultDTO<{ total: number, exported: number, notFoundIds: number[] }>>,

  exportPlaylist(
    toExport: ApiExportPlaylistDto,
    credentials: StreamingCredentialsDTO,
  ): Promise<ServiceResultDTO<{ total: number, exported: number, notFoundIds: number[] }>>,
}
