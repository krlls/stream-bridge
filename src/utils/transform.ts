import { EStreamingType } from '../types/common'
import { Api } from '../types/TApi'

export const convertStreamingName = (name: string): EStreamingType | undefined =>
  ({
    [Api.Streaming.EApiStreamingType.SPOTIFY]: EStreamingType.SPOTIFY,
  })[name]
