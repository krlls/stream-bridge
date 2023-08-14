import { Streaming } from '../entities/Streaming'
import { CreateStreamingDTO } from '../dtos/CreateStreamingDTO'
import { EStreamingType } from '../../../types/common'
import { UpdateStreamingTokenDTO } from '../dtos/UpdateStreamingTokenDTO'

export interface IStreamingRepository {
  createStreaming(steamingData: CreateStreamingDTO): Promise<Streaming | null>,
  getStreaming(userId: number, type: EStreamingType): Promise<Streaming | null>,
  updateStreamingWithToken(streamingId: number, data: UpdateStreamingTokenDTO): Promise<Streaming | null>,
  getUserStreamings(userId: number): Promise<Streaming[]>,
  removeUserStreamingByType(userId: number, streamingType: EStreamingType): Promise<number>,
}
