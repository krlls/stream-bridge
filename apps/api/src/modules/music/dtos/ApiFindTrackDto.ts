export class ApiFindTrackDto {
  name: string
  artist: string
  album: string
  isrc?: string

  constructor({ name, artist, album, isrc }: { name: string, artist: string, album: string, isrc?: string }) {
    this.name = name
    this.artist = artist
    this.album = album
    this.isrc = isrc
  }
}
