export class StreamingCredentialsDTO {
  token: string
  refreshToken: string
  expiresIn: number

  constructor(data: { token: string, refreshToken: string, expiresIn: number }) {
    this.token = data.token
    this.refreshToken = data.refreshToken
    this.expiresIn = data.expiresIn
  }
}
