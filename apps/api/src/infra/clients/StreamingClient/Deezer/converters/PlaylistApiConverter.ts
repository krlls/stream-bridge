import { Converter } from '../../../../../types/common'
import { ExternalPlaylistDTO } from '../../../../../modules/music/dtos/ExternalPlaylistDTO'
import { Playlist } from '../interfaces/DeezerApi'

export class PlaylistApiConverter implements Converter<Playlist, ExternalPlaylistDTO> {
  from(from: Playlist): ExternalPlaylistDTO {
    return new ExternalPlaylistDTO({
      name: from.title,
      id: from.id,
      cover: from.picture_medium,
    })
  }
}
