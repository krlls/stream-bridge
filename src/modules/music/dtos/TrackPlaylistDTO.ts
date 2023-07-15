import { CreateTrackDTO } from './CreateTrackDTO'

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

  toCreate({ userId, playlistId }: { userId: number, playlistId: number }): CreateTrackDTO {
    return new CreateTrackDTO({
      userId,
      playlistId,
      externalId: this.id,
      name: this.name,
      artist: this.artist,
      album: this.album,
    })
  }
}
