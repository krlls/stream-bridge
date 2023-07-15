import { EStreamingType } from '../../../types/common'

export class GetTracksByPlaylistDTO {
  streamingType: EStreamingType
  userId: number
  playlistId: number
  playlistExternalId: string
  constructor(data: { streamingType: EStreamingType, userId: number, playlistId: number, playlistExternalId: string }) {
    this.playlistExternalId = data.playlistExternalId
    this.playlistId = data.playlistId
    this.userId = data.userId
    this.streamingType = data.streamingType
  }
}
