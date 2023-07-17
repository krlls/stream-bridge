import { EStreamingType } from '../../../types/common'

export class CreateStreamingDTO {
  userId: number
  token?: string
  refreshToken?: string
  expiresIn?: number
  type: EStreamingType

  constructor(streaming: {
    token?: string,
    userId: number,
    refreshToken?: string,
    type: EStreamingType,
    expiresIn?: number,
  }) {
    this.token = streaming.token
    this.refreshToken = streaming.refreshToken
    this.type = streaming.type
    this.userId = streaming.userId
    this.expiresIn = streaming.expiresIn
  }
}
