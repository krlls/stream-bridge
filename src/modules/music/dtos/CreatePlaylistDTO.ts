export class CreatePlaylistDTO {
  userId: string
  externalId: string
  name: string

  constructor(playlist: { userId: string, name: string, externalId: string }) {
    this.userId = playlist.userId
    this.name = playlist.name
    this.externalId = playlist.externalId
  }
}
