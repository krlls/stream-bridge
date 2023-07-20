import { PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk/src/types'

import { Converter } from '../../../../../types/common'
import { ExternalTrackDTO } from '../../../../../modules/music/dtos/ExternalTrackDTO'

export class TrackApiConverter implements Converter<PlaylistedTrack, ExternalTrackDTO> {
  from(from: PlaylistedTrack): ExternalTrackDTO {
    const track = from.track as Track

    return new ExternalTrackDTO({
      artist: (track.artists || [])
        .map((a, index, arr) => (index === arr.length - 1 ? a.name : `${a.name}, `))
        .join(' '),
      album: track.album.name,
      name: track.name,
      id: track.id,
    })
  }
}
