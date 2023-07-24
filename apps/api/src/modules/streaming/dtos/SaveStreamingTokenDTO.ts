import { EStreamingType } from '../../../types/common'

export class SaveStreamingTokenDTO {
  streamingType: EStreamingType
  code: string
  userId: number
  constructor(data: { streamingType: EStreamingType, code: string, userId: number }) {
    this.code = data.code
    this.streamingType = data.streamingType
    this.userId = data.userId
  }
}
