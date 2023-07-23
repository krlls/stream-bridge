import { inject, injectable } from 'inversify'
import { In, Not, Repository } from 'typeorm'

import { TYPES } from '../../../../types/const'
import { Converter, EStreamingType, Uid } from '../../../../types/common'
import { getRepository } from '../SetupConnection'
import { TrackEntity } from '../entities/TrackEntity'
import { Track } from '../../../../modules/music/entities/Track'
import { ITracksRepository } from '../../../../modules/music/interfaces/ITracksRepository'
import { CreateTrackDTO } from '../../../../modules/music/dtos/CreateTrackDTO'
import { PlaylistEntity } from '../entities/PlaylistEntity'
import { GetTracksByPlaylistDTO } from '../../../../modules/music/dtos/GetTracksByPlaylistDTO'

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

  async purgeMismatchedTracksByImportId(playlistId: number, importId: Uid): Promise<{ deleted: number }> {
    const tracks = await this.repository.find({
      relations: ['playlist'],
      where: { playlist: { id: playlistId }, import_id: Not(importId) },
    })

    const deleted = await this.repository.delete({ id: In(tracks.map((t) => t.id)) })

    return { deleted: deleted.affected || 0 }
  }

  async getTrackById(trackId: number): Promise<Track | null> {
    const track = await this.repository.findOneBy({ id: trackId })

    if (!track) {
      return null
    }

    return this.trackEntityConverter.from(track)
  }

  async countTracksByStreaming(streamingType: EStreamingType): Promise<number> {
    const count = await this.repository.count({
      where: { streaming: { type: streamingType } },
    })

    if (!count) {
      return 0
    }

    return count
  }

  async getUserTracksByPlaylist({ playlistId, userId, limit, offset }: GetTracksByPlaylistDTO): Promise<Track[]> {
    const tracks = await this.repository.find({
      where: { playlist: { id: playlistId, user: { id: userId } } },
      take: limit,
      skip: offset,
    })

    if (!tracks) {
      return []
    }

    return tracks.map(this.trackEntityConverter.from)
  }

  private convertTrack(trackData: CreateTrackDTO, playlist: PlaylistEntity): TrackEntity {
    const track = new TrackEntity()

    track.external_id = trackData.externalId
    track.name = trackData.name
    track.artist = trackData.artist
    track.album = trackData.album
    track.playlist = playlist
    track.streaming = playlist.streaming
    track.import_id = trackData.importId

    return track
  }
}
