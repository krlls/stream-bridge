import { Streaming } from '../entities/Streaming'
import { CreateStreamingDTO } from '../dtos/CreateStreamingDTO'

export interface IStreamingRepository {
  createSreaming(steamingData: CreateStreamingDTO): Promise<Streaming | null>,
  // getSreamingById(steamingId: number): Promise<ServiceResultDTO<Streaming>>,
  // getSreamingsByUserId(userId: number): Promise<ServiceResultDTO<Streaming[]>>,
}
