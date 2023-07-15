import { EStreamingType } from '../../../types/common'

export class ImportPlaylistsDTO {
  streamingType: EStreamingType
  userId: number
  constructor({ streamingType, userId }: { streamingType: EStreamingType, userId: number }) {
    this.streamingType = streamingType
    this.userId = userId
  }
}
