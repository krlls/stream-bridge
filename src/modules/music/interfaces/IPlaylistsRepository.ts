import { Playlist } from '../entities/Playlist'
import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'

export interface IPlaylistsRepository {
  createPlaylist(playlistData: CreatePlaylistDTO): Promise<Playlist | null>,
  getPlaylistByExternalId(externalId: string): Promise<Playlist | null>,
  getPlaylistById(externalId: string): Promise<Playlist | null>,
  getPlaylistsByUserId(externalId: string): Promise<Playlist[]>,
}
