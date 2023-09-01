export class ApiFindTrackDto {
  name: string
  artist: string
  album: string

  constructor({ name, artist, album }: { name: string, artist: string, album: string }) {
    this.name = name
    this.artist = artist
    this.album = album
  }
}
