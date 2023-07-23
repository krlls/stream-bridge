import { Streaming } from '../entities/Streaming'
import { CreateStreamingDTO } from '../dtos/CreateStreamingDTO'
import { EStreamingType } from '../../../types/common'
import { CreateStreamingTokenDTO } from '../dtos/CreateStreamingTokenDTO'

export interface IStreamingRepository {
  createSreaming(steamingData: CreateStreamingDTO): Promise<Streaming | null>,
  getStreaming(userId: number, type: EStreamingType): Promise<Streaming | null>,
  updateStreamingWithToken(streamingId: number, data: CreateStreamingTokenDTO): Promise<Streaming | null>,
  getUserStreamings(userId: number): Promise<Streaming[]>,
  // getSreamingById(steamingId: number): Promise<ServiceResultDTO<Streaming>>,
  // getSreamingsByUserId(userId: number): Promise<ServiceResultDTO<Streaming[]>>,
}
