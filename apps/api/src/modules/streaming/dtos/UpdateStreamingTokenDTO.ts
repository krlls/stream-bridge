export class UpdateStreamingTokenDTO {
  token: string
  expiresIn: number
  refreshToken?: string
  constructor(streaming: { accessToken: string, refreshToken?: string, expiresIn: number }) {
    this.token = streaming.accessToken
    this.refreshToken = streaming.refreshToken
    this.expiresIn = streaming.expiresIn
  }
}
