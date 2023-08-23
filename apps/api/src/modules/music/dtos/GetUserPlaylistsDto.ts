import { EStreamingType } from '../../../types/common'

export class GetUserPlaylistsDto {
  userId: number
  offset?: number
  limit?: number
  streamingType?: EStreamingType

  constructor(data: { userId: number, offset?: number, limit?: number, streamingType?: EStreamingType }) {
    this.limit = data.limit
    this.offset = data.offset
    this.userId = data.userId
    this.streamingType = data.streamingType
  }
}
