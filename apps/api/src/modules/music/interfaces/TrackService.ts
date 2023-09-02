import { CreateTrackDTO } from '../dtos/CreateTrackDTO'
import { ServiceResultDTO } from '../../../types/common'
import { Track } from '../entities/Track'
import { ImportMediaDTO } from '../dtos/ImportMediaDTO'
import { ImportResultDTO } from '../dtos/ImportResultDTO'
import { ImportTracksByPlaylistDTO } from '../dtos/ImportTracksByPlaylistDTO'
import { GetTracksByPlaylistDTO } from '../dtos/GetTracksByPlaylistDTO'
import { TrackDTO } from '../dtos/TrackDto'
import { ExportTracksDto } from '../dtos/ExportTracksDto'

export interface ITrackService {
  getTrackById(trackId: number): Promise<ServiceResultDTO<Track>>,
  saveTrack(trackData: CreateTrackDTO): Promise<ServiceResultDTO<Track>>,
  getTracksByPlaylist(data: GetTracksByPlaylistDTO): Promise<ServiceResultDTO<TrackDTO[]>>,
  getAllTracksByPlaylistId(getTracksData: GetTracksByPlaylistDTO): Promise<TrackDTO[]>,
  importTracks(toImport: ImportMediaDTO): Promise<ServiceResultDTO<ImportResultDTO>>,
  importTracksByPlaylist(toImport: ImportTracksByPlaylistDTO): Promise<ServiceResultDTO<ImportResultDTO>>,
  exportTracks(
    userId: number,
    data: ExportTracksDto,
  ): Promise<ServiceResultDTO<{ total: number, exported: number, notFoundIds: number[] }>>,
}
