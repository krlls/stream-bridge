import { Uid } from '../../../types/common'

export interface Track {
  id: number,
  external_id: string,
  name: string,
  artist: string,
  album: string,
  import_id: Uid,
}
