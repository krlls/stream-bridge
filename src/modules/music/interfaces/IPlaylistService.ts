import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'
import { Playlist } from '../entities/Playlist'
import { ServiceResultDTO } from '../../../types/common'
import { ExportPlaylistsDTO } from '../dtos/ExportPlaylistsDTO'
import { ExportResultDTO } from '../dtos/ExportResultDTO'

export interface IPlaylistService {
  createPlayList(playlist: CreatePlaylistDTO): Promise<ServiceResultDTO<Playlist>>,
  getPlaylistById(id: number): Promise<ServiceResultDTO<Playlist | null>>,
  getPlaylistByExternalId(extenalId: string): Promise<ServiceResultDTO<Playlist | null>>,
  getUserPlaylists(userId: number): Promise<ServiceResultDTO<Playlist[]>>,
  exportPlaylists(toExport: ExportPlaylistsDTO): Promise<ServiceResultDTO<ExportResultDTO>>,
}
