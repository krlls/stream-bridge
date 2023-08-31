export class ApiFindTrackDto {
  name: string
  artist: string

  constructor({ name, artist }: { name: string, artist: string }) {
    this.name = name
    this.artist = artist
  }
}
