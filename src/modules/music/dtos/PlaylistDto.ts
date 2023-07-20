import { EStreamingType } from '../../../types/common'
import { Playlist } from '../entities/Playlist'

export class PlaylistDto {
  id: number
  externalId: string
  name: string
  streamingType: EStreamingType

  constructor(playlist: Playlist) {
    this.id = playlist.id
    this.externalId = playlist.external_id
    this.streamingType = playlist.streaming_type
    this.name = playlist.name
  }
}
