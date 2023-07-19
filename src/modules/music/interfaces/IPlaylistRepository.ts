import { Playlist } from '../entities/Playlist'
import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'
import { EStreamingType, Uid } from '../../../types/common'

export interface IPlaylistRepository {
  createPlaylist(playlistData: CreatePlaylistDTO): Promise<Playlist | null>,
  createPlaylists(playlistData: CreatePlaylistDTO[]): Promise<Playlist[]>,

  upsertPlaylists(playlistData: CreatePlaylistDTO[]): Promise<number>,

  getPlaylistByExternalId(externalId: string): Promise<Playlist | null>,
  getPlaylistById(id: number): Promise<Playlist | null>,
  getPlaylistsByUserId(userId: number): Promise<Playlist[]>,

  purgeMismatchedPlaylistsByImportId(data: {
    streamingType: EStreamingType,
    importId: Uid,
    userId: number,
  }): Promise<{ deleted: number }>,
}
