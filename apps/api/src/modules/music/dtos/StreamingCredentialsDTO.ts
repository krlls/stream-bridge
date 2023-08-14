export class StreamingCredentialsDTO {
  streamingId: number
  token: string
  refreshToken: string
  expiresIn: number
  expires: number

  constructor(data: { token: string, refreshToken: string, expiresIn: number, id: number, expires: number }) {
    this.token = data.token
    this.refreshToken = data.refreshToken
    this.expiresIn = data.expiresIn
    this.streamingId = data.id
    this.expires = data.expires
  }
}
