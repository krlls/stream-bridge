import { Api } from 'api-types'

export type TGetPlaylists = Api.Music.Playlists.Req & {
  streamingType: string,
}
