import { Uid } from '../../../types/common'

export class CreateTrackDTO {
  userId: number
  playlistId: number
  externalId: string
  name: string
  artist: string
  album: string
  importId: Uid

  constructor(track: {
    userId: number,
    playlistId: number,
    externalId: string,
    name: string,
    artist: string,
    album: string,
    importId: Uid,
  }) {
    this.externalId = track.externalId
    this.userId = track.userId
    this.album = track.album
    this.artist = track.artist
    this.name = track.name
    this.playlistId = track.playlistId
    this.importId = track.importId
  }
}
