import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'

import { TYPES } from '../../../../types/const'
import { Converter } from '../../../../types/common'
import { getRepository } from '../SetupConnection'
import { TrackEntity } from '../entities/TrackEntity'
import { Track } from '../../../../modules/music/entities/Track'
import { ITracksRepository } from '../../../../modules/music/interfaces/ITracksRepository'
import { CreateTrackDTO } from '../../../../modules/music/dtos/CreateTrackDTO'
import { PlaylistEntity } from '../entities/PlaylistEntity'

@injectable()
export class TrackRepository implements ITracksRepository {
  @inject(TYPES.TrackEntityConverter) private trackEntityConverter: Converter<TrackEntity, Track>
  private repository: Repository<TrackEntity>
  private playlistRepository: Repository<PlaylistEntity>
  constructor() {
    this.repository = getRepository(TrackEntity)
    this.playlistRepository = getRepository(PlaylistEntity)
  }

  async createTrack(trackData: CreateTrackDTO): Promise<Track | null> {
    const playlist = await this.playlistRepository.findOne({
      relations: ['tracks'],
      where: { id: trackData.playlistId },
    })

    if (!playlist) {
      return null
    }

    const track = new TrackEntity()

    track.external_id = trackData.externalId
    track.name = trackData.name
    track.artist = trackData.artist
    track.album = trackData.album

    playlist.tracks.push(track)

    const newtrack = await this.repository.save(track)

    if (!newtrack) {
      return null
    }

    return this.trackEntityConverter.from(newtrack)
  }
}
