import { Api } from 'api-types'

import { EStreamingType } from '../types/common'

export const convertStreamingName = (name: string): EStreamingType | undefined =>
  ({
    [Api.Streaming.EApiStreamingType.SPOTIFY]: EStreamingType.SPOTIFY,
  })[name]
