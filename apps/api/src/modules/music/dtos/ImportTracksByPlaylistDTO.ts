export class ImportTracksByPlaylistDTO {
  playlistId: number
  userId: number
  constructor({ playlistId, userId }: { playlistId: number, userId: number }) {
    this.playlistId = playlistId
    this.userId = userId
  }
}
