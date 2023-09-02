import { CreateTrackDTO } from '../dtos/CreateTrackDTO'
import { Track } from '../entities/Track'
import { EStreamingType, Uid } from '../../../types/common'
import { GetTracksByPlaylistDTO } from '../dtos/GetTracksByPlaylistDTO'

export interface ITracksRepository {
  createTrack(tracks: CreateTrackDTO): Promise<Track | null>,
  createTracks(tracks: CreateTrackDTO[]): Promise<Track[]>,

  upsertTracks(tracks: CreateTrackDTO[]): Promise<number>,

  getTracksByPlaylistId(playlistId: number): Promise<Track[]>,
  getTracksByUserId(id: number, trackIds?: number[]): Promise<Track[]>,
  getTrackById(trackId: number): Promise<Track | null>,
  getUserTracksByPlaylist(data: GetTracksByPlaylistDTO): Promise<Track[]>,

  purgeMismatchedTracksByImportId(playlistId: number, importId: Uid): Promise<{ deleted: number }>,

  countTracksByStreaming(streamingType: EStreamingType): Promise<number>,
}
