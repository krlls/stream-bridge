export class GetPlaylistsDTO {
  token: string
  refreshToken: string

  constructor(data: { token: string, refreshToken: string }) {
    this.token = data.token
    this.refreshToken = data.refreshToken
  }
}
