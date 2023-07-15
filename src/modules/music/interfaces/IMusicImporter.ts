import { GetPlaylistsDTO } from '../dtos/GetPlaylistsDTO'
import { EStreamingType } from '../../../types/common'

export interface IMusicImporter {
  importPlaylists(data: {
    userId: number,
    streamingId: number,
    streamingType: EStreamingType,
    credentials: GetPlaylistsDTO,
  }): Promise<{ exported: number, saved: number }>,
}
