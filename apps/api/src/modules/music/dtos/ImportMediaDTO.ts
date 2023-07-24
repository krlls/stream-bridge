import { EStreamingType } from '../../../types/common'

export class ImportMediaDTO {
  streamingType: EStreamingType
  userId: number
  constructor({ streamingType, userId }: { streamingType: EStreamingType, userId: number }) {
    this.streamingType = streamingType
    this.userId = userId
  }
}
