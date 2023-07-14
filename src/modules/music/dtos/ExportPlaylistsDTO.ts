import { EStreamingType } from '../../../types/common'

export class ExportPlaylistsDTO {
  streamingType: EStreamingType
  userId: number
  sync: boolean = false

  constructor({ streamingType, userId }: { streamingType: EStreamingType, userId: number }) {
    this.streamingType = streamingType
    this.userId = userId
  }
}
