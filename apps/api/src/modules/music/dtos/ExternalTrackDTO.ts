import { CreateTrackDTO } from './CreateTrackDTO'
import { Uid } from '../../../types/common'

export class ExternalTrackDTO {
  id: string
  name: string
  artist: string
  album: string

  constructor(track: { id: string, name: string, artist: string, album: string }) {
    this.id = track.id
    this.name = track.name
    this.artist = track.artist
    this.album = track.album
  }

  toCreate({ userId, playlistId, importId }: { userId: number, playlistId: number, importId: Uid }): CreateTrackDTO {
    return new CreateTrackDTO({
      userId,
      playlistId,
      importId,
      externalId: this.id,
      name: this.name,
      artist: this.artist,
      album: this.album,
    })
  }
}
