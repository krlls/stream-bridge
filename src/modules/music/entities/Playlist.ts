import { User } from '../../user/entities/User'
import { Track } from './Track'

export interface Playlist {
  id: number,
  user: User,
  external_id: string,
  name: string,
  tracks: Track[],
}
