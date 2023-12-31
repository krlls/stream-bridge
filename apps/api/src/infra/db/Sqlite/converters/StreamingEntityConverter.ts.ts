import { injectable } from 'inversify'

import { Converter } from '../../../../types/common'
import { StreamingEntity } from '../entities/StreamingEntity'
import { Streaming } from '../../../../modules/streaming/entities/Streaming'

@injectable()
export class StreamingEntityConverter implements Converter<StreamingEntity, Streaming> {
  from(from: StreamingEntity): Streaming {
    return {
      id: from.id,
      token: from.token,
      refresh_token: from.refresh_token,
      type: from.type,
      expiresIn: from.expiresIn,
      playlists: from.playlistsCount,
      tracks: from.tracksCount,
      expires: from.expires,
    }
  }

  to(_to: Streaming): StreamingEntity {
    return new StreamingEntity()
  }
}
