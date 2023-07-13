import { CreatePlaylistDTO } from './CreatePlaylistDTO'

export class ExternalPlaylistDTO {
  external_id: string
  name: string

  constructor(playlist: { id: string, name: string }) {
    this.external_id = playlist.id
    this.name = playlist.name
  }

  toCreate({ userId, streamingId }: { userId: number, streamingId: number }): CreatePlaylistDTO {
    return new CreatePlaylistDTO({
      userId,
      streamingId,
      externalId: this.external_id,
      name: this.name,
    })
  }
}
