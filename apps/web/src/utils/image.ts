import { EStreamingType } from 'api-types'

import spotifyLogo from '../assets/spotify.svg'
import deezerLogo from '../assets/deezer.svg'

export const streamingToLogo = (type: EStreamingType): string =>
  ({
    [EStreamingType.SPOTIFY]: spotifyLogo,
    [EStreamingType.TIDAL]: spotifyLogo,
    [EStreamingType.DEEZER]: deezerLogo,
  })[type]
