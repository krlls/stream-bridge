import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk/src/types'

import { Converter } from '../../../../../types/common'
import { ExternalPlaylistDTO } from '../../../../../modules/music/dtos/ExternalPlaylistDTO'

export class PlaylistApiConverter implements Converter<SimplifiedPlaylist, ExternalPlaylistDTO> {
  from(from: SimplifiedPlaylist): ExternalPlaylistDTO {
    return new ExternalPlaylistDTO({
      name: from.name,
      id: from.id,
    })
  }
}
