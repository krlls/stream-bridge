import { injectable } from 'inversify'

import { Converter } from '../../../../types/common'
import { PlaylistEntity } from '../entities/PlaylistEntity'
import { Playlist } from '../../../../modules/music/entities/Playlist'

@injectable()
export class PlaylistEntityConverter implements Converter<PlaylistEntity, Playlist> {
  from(from: PlaylistEntity): Playlist {
    return {
      id: from.id,
      name: from.name,
      user: from.user,
      external_id: from.external_id,
      import_id: from.import_id,
    }
  }

  to(_to: Playlist): PlaylistEntity {
    return new PlaylistEntity()
  }
}
