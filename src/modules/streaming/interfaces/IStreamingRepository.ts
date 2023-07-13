import { Streaming } from '../entities/Streaming'
import { CreateStreamingDTO } from '../dtos/CreateStreamingDTO'
import { EStreamingType } from '../../../types/common'

export interface IStreamingRepository {
  createSreaming(steamingData: CreateStreamingDTO): Promise<Streaming | null>,
  getStreaming(userId: number, type: EStreamingType): Promise<Streaming | null>,
  // getSreamingById(steamingId: number): Promise<ServiceResultDTO<Streaming>>,
  // getSreamingsByUserId(userId: number): Promise<ServiceResultDTO<Streaming[]>>,
}