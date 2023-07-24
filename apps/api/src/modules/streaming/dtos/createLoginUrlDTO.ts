import { EStreamingType } from '../../../types/common'

export class CreateLoginUrlDTO {
  streamingType: EStreamingType
  token: string
  constructor(data: { streamingType: EStreamingType, token: string }) {
    this.streamingType = data.streamingType
    this.token = data.token
  }
}
