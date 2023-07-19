import { CreateTrackDTO } from '../dtos/CreateTrackDTO'
import { Track } from '../entities/Track'
import { Uid } from '../../../types/common'

export interface ITracksRepository {
  createTrack(tracks: CreateTrackDTO): Promise<Track | null>,
  createTracks(tracks: CreateTrackDTO[]): Promise<Track[]>,

  upsertTracks(tracks: CreateTrackDTO[]): Promise<number>,

  getTracksByPlaylistId(playlistId: number): Promise<Track[]>,
  getTracksByUserId(id: number): Promise<Track[]>,
  getTrackById(trackId: number): Promise<Track | null>,

  purgeMismatchedTracksByImportId(playlistId: number, importId: Uid): Promise<{ deleted: number }>,
  // createTracks(tracks: CreateTrackDTO[]): boolean,
  // getTracksByExternalIds(externalIds: string[]): Promise<Track[]>,
  // getTracksByExternalId(externalId: string): Promise<Track[]>,
  // getTracksByIds(tracksIds: number[]): Promise<Track[]>,
}
