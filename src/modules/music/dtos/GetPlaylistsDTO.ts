export class GetPlaylistsDTO {
  token: string
  refreshToken: string

  constructor(data: { tocken: string, refreshToken: string }) {
    this.token = data.tocken
    this.refreshToken = data.refreshToken
  }
}
