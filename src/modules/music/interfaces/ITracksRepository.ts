import { CreateTrackDTO } from '../dtos/CreateTrackDTO'
import { Track } from '../entities/Track'

export interface ITracksRepository {
  createTracks(tracks: CreateTrackDTO[]): boolean,
  createTrack(tracks: CreateTrackDTO): Promise<Track | null>,
  getTracksByExternalIds(externalIds: string[]): Promise<Track[]>,
  getTracksByExternalId(externalId: string): Promise<Track[]>,
  getTrackById(id: number): Promise<Track | null>,
  getTracksByIds(tracksIds: number[]): Promise<Track[]>,
  getTracksByPlaylistId(playlistId: number): Promise<Track[]>,
}
