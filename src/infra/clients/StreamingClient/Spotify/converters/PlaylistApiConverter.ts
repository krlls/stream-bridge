import { Playlist } from '@spotify/web-api-ts-sdk/src/types'

import { Converter } from '../../../../../types/common'
import { ExternalPlaylistDTO } from '../../../../../modules/music/dtos/ExternalPlaylistDTO'

export class PlaylistApiConverter implements Converter<Playlist, ExternalPlaylistDTO> {
  from(from: Playlist): ExternalPlaylistDTO {
    return new ExternalPlaylistDTO({
      name: from.name,
      id: from.id,
    })
  }
}
