import { EStreamingType } from '../../../types/common'

export interface Streaming {
  id: number,
  token?: string,
  reefresh_token?: string,
  type: EStreamingType,
}
