import { Playlist } from '../entities/Playlist'
import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'
import { EStreamingType, Uid } from '../../../types/common'
import { GetUserPlaylistsDto } from '../dtos/GetUserPlaylistsDto'

export interface IPlaylistRepository {
  createPlaylist(playlistData: CreatePlaylistDTO): Promise<Playlist | null>,
  createPlaylists(playlistData: CreatePlaylistDTO[]): Promise<Playlist[]>,

  upsertPlaylists(playlistData: CreatePlaylistDTO[]): Promise<number>,

  getPlaylistByExternalId(externalId: string): Promise<Playlist | null>,
  getPlaylistById(id: number, userId?: number): Promise<Playlist | null>,
  getPlaylistsByUserId(data: GetUserPlaylistsDto): Promise<Playlist[]>,

  purgeMismatchedPlaylistsByImportId(data: {
    streamingType: EStreamingType,
    importId: Uid,
    userId: number,
  }): Promise<{ deleted: number }>,

  countPlaylistsByStreaming(streamingType: EStreamingType): Promise<number>,
}
