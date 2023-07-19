import { Uid } from '../../../types/common'

export class CreatePlaylistDTO {
  userId: number
  streamingId: number
  externalId: string
  name: string
  importId: Uid

  constructor(playlist: { userId: number, name: string, externalId: string, streamingId: number, importId: Uid }) {
    this.userId = playlist.userId
    this.name = playlist.name
    this.externalId = playlist.externalId
    this.streamingId = playlist.streamingId
    this.importId = playlist.importId
  }
}
