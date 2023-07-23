import { EStreamingType } from '../../../types/common'

export interface Streaming {
  id: number,
  type: EStreamingType,
  token?: string,
  refresh_token?: string,
  expiresIn?: number,

  playlists?: number,
  tracks?: number,
}
