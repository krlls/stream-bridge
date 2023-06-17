export class CreateTrack {
  userId: string
  playlistId: string
  externalId: string
  name: string
  artist: string
  album: string
  constructor(track: {
    userId: string,
    playlistId: string,
    externalId: string,
    name: string,
    artist: string,
    album: string,
  }) {
    this.userId = track.userId
    this.album = track.album
    this.userId = track.userId
    this.artist = track.artist
    this.name = track.name
    this.playlistId = track.playlistId
  }
}
