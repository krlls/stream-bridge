import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'
import { Playlist } from '../entities/Playlist'
import { ServiceResultDTO } from '../../../types/common'
import { ImportMediaDTO } from '../dtos/ImportMediaDTO'
import { ImportResultDTO } from '../dtos/ImportResultDTO'
import { GetUserPlaylistsDto } from '../dtos/GetUserPlaylistsDto'
import { PlaylistDto } from '../dtos/PlaylistDto'
import { ImportLibResultDTO } from '../dtos/ImportLibResultDTO'

export interface IPlaylistService {
  createPlayList(playlist: CreatePlaylistDTO): Promise<ServiceResultDTO<Playlist>>,
  getPlaylistById(id: number): Promise<ServiceResultDTO<PlaylistDto>>,
  getPlaylistByExternalId(externalId: string): Promise<ServiceResultDTO<Playlist | null>>,
  getUserPlaylists(getPlaylists: GetUserPlaylistsDto): Promise<ServiceResultDTO<PlaylistDto[]>>,
  getAllUserPlaylists(getPlaylists: GetUserPlaylistsDto): Promise<ServiceResultDTO<PlaylistDto[]>>,
  importPlaylists(importDto: ImportMediaDTO): Promise<ServiceResultDTO<ImportResultDTO>>,
  importAllMedia(importDto: ImportMediaDTO): Promise<ServiceResultDTO<ImportLibResultDTO>>,
}
