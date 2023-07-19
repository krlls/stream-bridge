import { User } from '../../user/entities/User'
import { Uid } from '../../../types/common'

export interface Playlist {
  id: number,
  user: User,
  external_id: string,
  name: string,
  import_id: Uid,
}
