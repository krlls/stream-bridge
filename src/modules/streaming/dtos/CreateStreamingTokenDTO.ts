export class CreateStreamingTokenDTO {
  token: string
  refreshToken: string
  expiresIn: number
  constructor(streaming: { token: string, refreshToken: string, expiresIn: number }) {
    this.token = streaming.token
    this.refreshToken = streaming.refreshToken
    this.expiresIn = streaming.expiresIn
  }
}
