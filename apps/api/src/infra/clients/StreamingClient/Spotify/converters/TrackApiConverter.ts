import { Track } from '@spotify/web-api-ts-sdk/src/types'

import { Converter } from '../../../../../types/common'
import { ExternalTrackDTO } from '../../../../../modules/music/dtos/ExternalTrackDTO'

export class TrackApiConverter implements Converter<Track, ExternalTrackDTO> {
  from(from: Track): ExternalTrackDTO {
    return new ExternalTrackDTO({
      artist: (from.artists || [])
        .map((a, index, arr) => (index === arr.length - 1 ? a.name : `${a.name}, `))
        .join(' '),
      album: from.album.name,
      name: from.name,
      id: from.id,
    })
  }
}
