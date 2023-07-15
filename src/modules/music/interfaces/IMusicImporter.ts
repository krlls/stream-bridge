import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { EStreamingType } from '../../../types/common'
import { GetTracksByPlaylistDTO } from '../dtos/GetTracksByPlaylistDTO'

export interface IMusicImporter {
  importPlaylists(data: {
    userId: number,
    streamingId: number,
    streamingType: EStreamingType,
    credentials: StreamingCredentialsDTO,
  }): Promise<{ exported: number, saved: number }>,

  importTracksByPlaylist(
    credentials: StreamingCredentialsDTO,
    data: GetTracksByPlaylistDTO,
  ): Promise<{ exported: number, saved: number }>,
}
