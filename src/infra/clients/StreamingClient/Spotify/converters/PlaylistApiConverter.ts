import { Converter } from '../../../../../types/common'
import { IApiPlaylist } from '../interfaces/ISpotifyApi'
import { ExternalPlaylistDTO } from '../../../../../modules/music/dtos/ExternalPlaylistDTO'

export class PlaylistApiConverter implements Converter<IApiPlaylist, ExternalPlaylistDTO> {
  from(from: IApiPlaylist): ExternalPlaylistDTO {
    return new ExternalPlaylistDTO({
      name: from.name,
      id: from.id,
    })
  }
}
