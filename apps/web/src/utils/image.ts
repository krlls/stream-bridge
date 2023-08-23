import { EStreamingType } from 'api-types'

import spotifyLogo from '../assets/spotify.svg'

export const streamingToLogo = (type: EStreamingType): string =>
  ({
    [EStreamingType.SPOTIFY]: spotifyLogo,
    [EStreamingType.TIDAL]: spotifyLogo,
    [EStreamingType.DEEZER]: spotifyLogo,
  })[type]
