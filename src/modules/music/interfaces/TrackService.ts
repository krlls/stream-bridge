import { CreateTrackDTO } from '../dtos/CreateTrackDTO'
import { ServiceResultDTO } from '../../../types/common'
import { Track } from '../entities/Track'
import { ImportMediaDTO } from '../dtos/ImportMediaDTO'
import { ImportResultDTO } from '../dtos/ImportResultDTO'
import { ImportTracksByPlaylistDTO } from '../dtos/ImportTracksByPlaylistDTO'

export interface ITrackService {
  // saveTracks(tracks: CreateTrackDTO[]): Promise<boolean>,
  getTrackById(trackId: number): Promise<ServiceResultDTO<Track>>,
  saveTrack(trackData: CreateTrackDTO): Promise<ServiceResultDTO<Track>>,
  getTracksByPlaylist(playlistId: number): Promise<ServiceResultDTO<Track[]>>,
  importTracks(toImport: ImportMediaDTO): Promise<ServiceResultDTO<ImportResultDTO>>,
  importTracksByPlaylist(toImport: ImportTracksByPlaylistDTO): Promise<ServiceResultDTO<ImportResultDTO>>,
}
