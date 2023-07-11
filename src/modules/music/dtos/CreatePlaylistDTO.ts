export class CreatePlaylistDTO {
  userId: number
  externalId: string
  name: string

  constructor(playlist: { userId: number, name: string, externalId: string }) {
    this.userId = playlist.userId
    this.name = playlist.name
    this.externalId = playlist.externalId
  }
}
