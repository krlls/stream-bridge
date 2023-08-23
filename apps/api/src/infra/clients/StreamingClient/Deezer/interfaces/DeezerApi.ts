export interface ITokenResp {
  access_token: string,
  expires: number,
}

export interface Paginated<T> {
  data: T[],
  total: number,
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
