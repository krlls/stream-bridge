import { PlaylistEntity } from '../../../infra/db/Sqlite/entities/PlaylistEntity'

export interface Track {
  id: number,
  playlist: PlaylistEntity,
  external_id: string,
  name: string,
  artist: string,
  album: string,
}
