import { EStreamingType } from '../../../types/common'

export class AvailableStreamingDTO {
  type: EStreamingType
  name: string

  constructor({ name, type }: { type: EStreamingType, name: string }) {
    this.name = name
    this.type = type
  }
}
