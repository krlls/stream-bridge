import { Track } from '../entities/Track'

export class TrackDTO {
  id: number
  playlistId: number
  externalId: string
  name: string
  artist: string
  album: string
  constructor(track: Track) {
    this.id = track.id
    this.album = track.album
    this.artist = track.artist
    this.name = track.name
    this.externalId = track.external_id
  }
}
