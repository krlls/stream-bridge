import { Converter } from '../../../../../types/common'
import { ITrackApi } from '../interfaces/ISpotifyApi'
import { ExternalTrackDTO } from '../../../../../modules/music/dtos/TrackPlaylistDTO'

export class TrackApiConverter implements Converter<ITrackApi, ExternalTrackDTO> {
  from(from: ITrackApi): ExternalTrackDTO {
    return new ExternalTrackDTO({
      artist: from.artist,
      album: from.album,
      name: from.name,
      id: from.id,
    })
  }
}
