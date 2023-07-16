import { EStreamingType, ServiceResultDTO } from '../../../types/common'
import { Streaming } from '../entities/Streaming'
import { CreateStreamingDTO } from '../dtos/CreateStreamingDTO'
import { LoginUrlDTO } from '../dtos/LoginUrlDTO'

export interface IStreamingService {
  createStreaming(steamingData: CreateStreamingDTO): Promise<ServiceResultDTO<Streaming>>,
  getLoginUrl(streamingType: EStreamingType): Promise<ServiceResultDTO<LoginUrlDTO>>,
  // getStreaming(userId: number, streamingType: string): Promise<ServiceResultDTO<Streaming>>,
  // getSreamingById(steamingId: number): Promise<ServiceResultDTO<Streaming>>,
  // getSreamingsByUserId(userId: number): Promise<ServiceResultDTO<Streaming[]>>,
}
