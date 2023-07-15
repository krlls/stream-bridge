import { Playlist } from '../entities/Playlist'
import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'

export interface IPlaylistRepository {
  createPlaylist(playlistData: CreatePlaylistDTO): Promise<Playlist | null>,
  createPlaylists(playlistData: CreatePlaylistDTO[]): Promise<Playlist[]>,
  getPlaylistByExternalId(externalId: string): Promise<Playlist | null>,
  getPlaylistById(id: number): Promise<Playlist | null>,
  getPlaylistsByUserId(userId: number): Promise<Playlist[]>,
}
