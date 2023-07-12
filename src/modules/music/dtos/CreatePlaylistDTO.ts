export class CreatePlaylistDTO {
  userId: number
  streamingId: number
  externalId: string
  name: string

  constructor(playlist: { userId: number, name: string, externalId: string, streamingId: number }) {
    this.userId = playlist.userId
    this.name = playlist.name
    this.externalId = playlist.externalId
    this.streamingId = playlist.streamingId
  }
}
