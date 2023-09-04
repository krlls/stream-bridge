export class ExportTracksDto {
  ids: number[]
  playlistId: number

  constructor({ trackIds, playlistId }: { trackIds: number[], playlistId: number }) {
    this.ids = trackIds
    this.playlistId = playlistId
  }
}
