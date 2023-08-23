export class CreateStreamingTokenDTO {
  token: string
  refreshToken: string
  expiresIn: number
  expires: number
  constructor(streaming: { token: string, refreshToken?: string, expiresIn: number, expires: number }) {
    this.token = streaming.token
    this.refreshToken = streaming.refreshToken || ''
    this.expiresIn = streaming.expiresIn
    this.expires = streaming.expires
  }
}
