import { ServiceResultDTO } from '../../../types/common'
import { Streaming } from '../entities/Streaming'
import { CreateStreamingDTO } from '../dtos/CreateStreamingDTO'

export interface IStreamingService {
  createSreaming(steamingData: CreateStreamingDTO): Promise<ServiceResultDTO<Streaming>>,
  // getSreamingById(steamingId: number): Promise<ServiceResultDTO<Streaming>>,
  // getSreamingsByUserId(userId: number): Promise<ServiceResultDTO<Streaming[]>>,
}
