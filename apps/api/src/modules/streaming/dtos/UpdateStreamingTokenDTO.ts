export class UpdateStreamingTokenDTO {
  token: string
  expiresIn: number
  refreshToken?: string
  expires: number
  constructor(streaming: { accessToken: string, refreshToken?: string, expiresIn: number, expires: number }) {
    this.token = streaming.accessToken
    this.refreshToken = streaming.refreshToken
    this.expiresIn = streaming.expiresIn
    this.expires = streaming.expires
  }
}
