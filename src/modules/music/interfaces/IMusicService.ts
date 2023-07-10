import { CreateTrackDTO } from '../dtos/CreateTrackDTO'
import { TrackDTO } from '../dtos/TrackDTO'

export interface IMusicService {
  saveTracks(tracks: CreateTrackDTO[]): Promise<boolean>,
  getTracks(playlistId?: string): Promise<TrackDTO[]>,
}
