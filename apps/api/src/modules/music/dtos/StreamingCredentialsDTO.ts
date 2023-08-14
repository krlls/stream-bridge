export class StreamingCredentialsDTO {
  streamingId: number
  token: string
  refreshToken: string
  expiresIn: number

  constructor(data: { token: string, refreshToken: string, expiresIn: number, id: number }) {
    this.token = data.token
    this.refreshToken = data.refreshToken
    this.expiresIn = data.expiresIn
    this.streamingId = data.id
  }
}
