import { CreateTrackDTO } from '../dtos/CreateTrackDTO'
import { ServiceResultDTO } from '../../../types/common'
import { Track } from '../entities/Track'

export interface ITrackService {
  // saveTracks(tracks: CreateTrackDTO[]): Promise<boolean>,
  // getTracks(playlistId?: string): Promise<TrackDTO[]>,
  saveTrack(trackData: CreateTrackDTO): Promise<ServiceResultDTO<Track>>,
}
