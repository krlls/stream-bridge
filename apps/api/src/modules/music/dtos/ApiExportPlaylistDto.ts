import { Track } from '../entities/Track'
import { EStreamingType } from '../../../types/common'

export class ApiExportPlaylistDto {
  streamingType: EStreamingType
  name: string
  tracks: Track[]
  desc?: string

  constructor(data: { name: string, tracks: Track[], desc?: string }) {
    this.name = data.name
    this.tracks = data.tracks
    this.desc = data.desc
  }
}
