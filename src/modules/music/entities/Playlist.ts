import { EStreamingType, Uid } from '../../../types/common'

export interface Playlist {
  id: number,
  user_id: number,
  external_id: string,
  name: string,
  import_id: Uid,
  streaming_type: EStreamingType,
}
