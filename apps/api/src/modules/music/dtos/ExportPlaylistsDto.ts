import { EStreamingType } from '../../../types/common'

export class ExportPlaylistsDto {
  userId: number
  ids: number[]
  target: EStreamingType

  constructor({ ids, target }: { userId: number, ids: number[], target: EStreamingType }) {
    this.ids = ids
    this.target = target
  }
}
