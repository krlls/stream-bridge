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
      reefresh_token: from.reefresh_token,
      type: from.type,
    }
  }

  to(_to: Streaming): StreamingEntity {
    return new StreamingEntity()
  }
}
