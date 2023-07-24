import { EStreamingType } from '../../../types/common'

export class StreamingDTO {
  id: number
  type: EStreamingType
  playlists: number
  tracks: number

  constructor({
    id,
    type,
    playlists = 0,
    tracks = 0,
  }: {
    id: number,
    type: EStreamingType,
    playlists?: number,
    tracks?: number,
  }) {
    this.id = id
    this.type = type
    this.playlists = playlists
    this.tracks = tracks
  }
}
