export class GetTracksByPlaylistDTO {
  userId: number
  playlistId: number
  limit?: number
  offset?: number
  constructor(data: { userId: number, playlistId: number, limit?: number, offset?: number }) {
    this.playlistId = data.playlistId
    this.userId = data.userId
    this.offset = data.offset
    this.limit = data.limit
  }
}
