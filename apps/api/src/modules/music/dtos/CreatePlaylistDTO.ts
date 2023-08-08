import { Uid } from '../../../types/common'

export class CreatePlaylistDTO {
  userId: number
  streamingId: number
  externalId: string
  name: string
  importId: Uid
  cover?: string

  constructor(playlist: {
    userId: number,
    name: string,
    externalId: string,
    streamingId: number,
    importId: Uid,
    cover?: string,
  }) {
    this.userId = playlist.userId
    this.name = playlist.name
    this.externalId = playlist.externalId
    this.streamingId = playlist.streamingId
    this.importId = playlist.importId
    this.cover = playlist.cover
  }
}
