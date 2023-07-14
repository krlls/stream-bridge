export class GetPlaylistsDTO {
  token: string
  refreshToken: string
  offset: number
  limit?: number = 50

  constructor(data: { token: string, refreshToken: string, offset: number, limit?: number }) {
    this.token = data.token
    this.refreshToken = data.refreshToken
    this.offset = data.offset
    this.limit = data.limit
  }
}
