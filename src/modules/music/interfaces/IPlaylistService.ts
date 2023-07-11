import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'
import { Playlist } from '../entities/Playlist'
import { ServiceResultDTO } from '../../../types/common'

export interface IPlaylistService {
  createPlayList(playlist: CreatePlaylistDTO): Promise<ServiceResultDTO<Playlist>>,
  getPlaylistById(id: number): Promise<ServiceResultDTO<Playlist | null>>,
  getPlaylistByExternalId(extenalId: string): Promise<ServiceResultDTO<Playlist | null>>,
  getUserPlaylists(userId: number): Promise<ServiceResultDTO<Playlist[]>>,
}
