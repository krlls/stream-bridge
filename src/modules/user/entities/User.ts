import { Playlist } from '../../music/entities/Playlist'

export interface User {
  id: number,
  login: string,
  name: string,
  hash: string,
  playlists: Playlist[],
}
