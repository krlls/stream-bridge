import { CreateTrackDTO } from '../dtos/CreateTrackDTO'
import { Track } from '../entities/Track'

export interface ITracksRepository {
  createTrack(tracks: CreateTrackDTO): Promise<Track | null>,
  // getTrackById(id: number): Promise<Track | null>,
  getTracksByPlaylistId(playlistId: number): Promise<Track[]>,
  // createTracks(tracks: CreateTrackDTO[]): boolean,
  // getTracksByExternalIds(externalIds: string[]): Promise<Track[]>,
  // getTracksByExternalId(externalId: string): Promise<Track[]>,
  // getTracksByIds(tracksIds: number[]): Promise<Track[]>,
}
