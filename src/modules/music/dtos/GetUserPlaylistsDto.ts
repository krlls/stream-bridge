export class GetUserPlaylistsDto {
  userId: number
  offset?: number
  limit?: number

  constructor(data: { userId: number, offset?: number, limit?: number }) {
    this.limit = data.limit
    this.offset = data.offset
    this.userId = data.userId
  }
}
