import { Converter } from '../../../../../types/common'
import { ExternalTrackDTO } from '../../../../../modules/music/dtos/ExternalTrackDTO'
import { Track } from '../interfaces/DeezerApi'

export class TrackApiConverter implements Converter<Track, ExternalTrackDTO> {
  from(from: Track): ExternalTrackDTO {
    return new ExternalTrackDTO({
      artist: from.artist.name,
      album: from.album.title,
      name: from.title,
      id: String(from.id),
    })
  }
}
