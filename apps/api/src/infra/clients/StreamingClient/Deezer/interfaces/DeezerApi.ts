export interface ITokenResp {
  access_token: string,
  expires: number,
}

export interface Paginated<T> {
  data: T[],
  total: number,
  checksum?: string,
  next?: string,
}

export interface Playlist {
  id: string,
  title: string,
  duration: number,
  public: boolean,
  is_loved_track: boolean,
  collaborative: boolean,
  nb_tracks: number,
  fans: number,
  link: string,
  picture: string,
  picture_small: string,
  picture_medium: string,
  picture_big: string,
  picture_xl: string,
  checksum: string,
  tracklist: string,
  creation_date: string,
  md5_image: string,
  picture_type: string,
  time_add: number,
  time_mod: number,
  creator: Creator,
  type: string,
}

export interface Creator {
  id: string,
  name: string,
  tracklist: string,
  type: string,
}

export interface Track {
  id: number,
  readable: boolean,
  title: string,
  title_short: string,
  link: string,
  duration: number,
  rank: number,
  explicit_lyrics: boolean,
  explicit_content_lyrics: number,
  explicit_content_cover: number,
  preview: string,
  md5_image: string,
  time_add: number,
  artist: Artist,
  album: Album,
  type: 'track',
  title_version?: string,
}

export interface Artist {
  id: number,
  name: string,
  link: string,
  picture: string,
  picture_small: string,
  picture_medium: string,
  picture_big: string,
  picture_xl: string,
  tracklist: string,
  type: string,
}

export interface Album {
  id: number,
  title: string,
  cover: string,
  cover_small: string,
  cover_medium: string,
  cover_big: string,
  cover_xl: string,
  md5_image: string,
  tracklist: string,
  type: string,
}
