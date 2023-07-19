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
      relations: ['streaming'],
      where: { id: trackData.playlistId },
    })

    if (!playlist) {
      return null
    }

    const track = this.convertTrack(trackData, playlist)
    const newTrack = await this.repository.save(track)

    if (!newTrack) {
      return null
    }

    return this.trackEntityConverter.from(newTrack)
  }

  async createTracks(trackData: CreateTrackDTO[]): Promise<Track[]> {
    if (!trackData.length) {
      return []
    }

    const playlist = await this.playlistRepository.findOne({
      relations: ['streaming'],
      where: { id: trackData[0].playlistId },
    })

    if (!playlist) {
      return []
    }

    const tracks = trackData.map((dto) => this.convertTrack(dto, playlist))
    const newTracks = await this.repository.save(tracks)

    if (!newTracks) {
      return []
    }

    return newTracks.map(this.trackEntityConverter.from)
  }

  async getTracksByPlaylistId(playlistId: number) {
    const tracks = await this.repository.findBy({ playlist: { id: playlistId } })

    if (!tracks) {
      return []
    }

    return tracks.map(this.trackEntityConverter.from)
  }

  async upsertTracks(tracks: CreateTrackDTO[]): Promise<number> {
    if (!tracks.length) {
      return 0
    }

    const playlist = await this.playlistRepository.findOne({
      relations: ['streaming'],
      where: { id: tracks[0].playlistId },
    })

    if (!playlist) {
      return 0
    }

    const convertedTracks = tracks.map((track) => this.convertTrack(track, playlist))

    const result = await this.repository.upsert(convertedTracks, ['external_id', 'playlist'])

    if (!result) {
      return 0
    }

    return result.generatedMaps.length
  }

  async getTracksByUserId(userId: number): Promise<Track[]> {
    const tracks = await this.repository.find({
      relations: ['playlist', 'user'],
      where: {
        playlist: {
          user: { id: userId },
        },
      },
    })

    if (!tracks) {
      return []
    }

    return tracks
  }

  private convertTrack(trackData: CreateTrackDTO, playlist: PlaylistEntity): TrackEntity {
    const track = new TrackEntity()

    track.external_id = trackData.externalId
    track.name = trackData.name
    track.artist = trackData.artist
    track.album = trackData.album
    track.playlist = playlist
    track.streaming = playlist.streaming

    return track
  }
}
