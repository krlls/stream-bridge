import { EStreamingType } from 'api-types'

export class ExportTracksDto {
  ids: number[]
  to: EStreamingType

  constructor({ trackIds, to }: { trackIds: number[], to: EStreamingType }) {
    this.ids = trackIds
    this.to = to
  }
}
