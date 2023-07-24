import { injectable } from 'inversify'

import { Converter } from '../../../../types/common'
import { Track } from '../../../../modules/music/entities/Track'
import { TrackEntity } from '../entities/TrackEntity'

@injectable()
export class TrackEntityConverter implements Converter<TrackEntity, Track> {
  from(from: TrackEntity): Track {
    return {
      id: from.id,
      name: from.name,
      external_id: from.external_id,
      artist: from.artist,
      album: from.album,
      import_id: from.import_id,
    }
  }

  to(to: Track): TrackEntity {
    const track = new TrackEntity()

    track.id = to.id
    track.external_id = to.external_id
    track.name = to.name
    track.artist = to.artist
    track.import_id = to.import_id

    return track
  }
}
