import { CreatePlaylistDTO } from './CreatePlaylistDTO'
import { Uid } from '../../../types/common'

export class ExternalPlaylistDTO {
  external_id: string
  name: string
  cover?: string

  constructor(playlist: { id: string, name: string, cover?: string }) {
    this.external_id = playlist.id
    this.name = playlist.name
    this.cover = playlist.cover
  }

  toCreate({
    userId,
    streamingId,
    importId,
  }: {
    userId: number,
    streamingId: number,
    importId: Uid,
  }): CreatePlaylistDTO {
    return new CreatePlaylistDTO({
      userId,
      streamingId,
      importId,
      externalId: this.external_id,
      name: this.name,
      cover: this.cover,
    })
  }
}
