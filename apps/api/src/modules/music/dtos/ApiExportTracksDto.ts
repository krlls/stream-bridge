import { EStreamingType } from 'api-types'

import { Track } from '../entities/Track'

export class ApiExportTracksDto {
  tracks: Track[]
  playlistId: string
  streamingType: EStreamingType

  constructor({
    tracks,
    playlistId,
    streamingType,
  }: {
    tracks: Track[],
    playlistId: string,
    streamingType: EStreamingType,
  }) {
    this.tracks = tracks
    this.playlistId = playlistId
    this.streamingType = streamingType
  }
}
