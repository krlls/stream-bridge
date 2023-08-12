import { ImportResultDTO } from './ImportResultDTO'

export type TImportsRes = { exported: number, saved: number }

export class ImportLibResultDTO {
  playlists: ImportResultDTO
  tracks: ImportResultDTO

  constructor({ tracks, playlists }: { tracks: TImportsRes, playlists: TImportsRes }) {
    this.tracks = tracks
    this.playlists = playlists
  }
}
