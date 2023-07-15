import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'
import { Playlist } from '../entities/Playlist'
import { ServiceResultDTO } from '../../../types/common'
import { ImportMediaDTO } from '../dtos/ImportMediaDTO'
import { ImportResultDTO } from '../dtos/ImportResultDTO'

export interface IPlaylistService {
  createPlayList(playlist: CreatePlaylistDTO): Promise<ServiceResultDTO<Playlist>>,
  getPlaylistById(id: number): Promise<ServiceResultDTO<Playlist | null>>,
  getPlaylistByExternalId(extenalId: string): Promise<ServiceResultDTO<Playlist | null>>,
  getUserPlaylists(userId: number): Promise<ServiceResultDTO<Playlist[]>>,
  importPlaylists(toExport: ImportMediaDTO): Promise<ServiceResultDTO<ImportResultDTO>>,
}
