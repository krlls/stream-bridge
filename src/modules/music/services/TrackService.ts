import { inject, injectable } from 'inversify'

import { TYPES } from '../../../types/const'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors } from '../../../types/common'
import { ITracksRepository } from '../interfaces/ITracksRepository'
import { ITrackService } from '../interfaces/TrackService'
import { CreateTrackDTO } from '../dtos/CreateTrackDTO'
import { ImportMediaDTO } from '../dtos/ImportMediaDTO'
import { IPlaylistRepository } from '../interfaces/IPlaylistRepository'
import { IMusicImporter } from '../interfaces/IMusicImporter'
import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { IStreamingRepository } from '../../streaming/interfaces/IStreamingRepository'
import { GetTracksByPlaylistDTO } from '../dtos/GetTracksByPlaylistDTO'
import { ImportResultDTO } from '../dtos/ImportResultDTO'

@injectable()
export class TrackService implements ITrackService {
  @inject(TYPES.TrackRepository) private trackRepository: ITracksRepository
  @inject(TYPES.PlaylistRepository) private playlistRepository: IPlaylistRepository
  @inject(TYPES.StreamingRepository) private streamingRepository: IStreamingRepository
  @inject(TYPES.MusicImporter) private musicImporter: IMusicImporter

  async saveTrack(trackData: CreateTrackDTO) {
    const track = await this.trackRepository.createTrack(trackData)

    if (!track) {
      return new ErrorDTO(Errors.TRACK_CREATE_ERROR)
    }

    return track
  }
  async getTracksByPlaylist(playlistId: number) {
    return await this.trackRepository.getTracksByPlaylistId(playlistId)
  }

  async importTracks(toImport: ImportMediaDTO) {
    const results = []
    const streaming = await this.streamingRepository.getStreaming(toImport.userId, toImport.streamingType)

    if (!streaming) {
      return new ErrorDTO(Errors.STREAMING_NOT_FOUND)
    }

    const playlists = await this.playlistRepository.getPlaylistsByUserId(toImport.userId)
    const credentials = new StreamingCredentialsDTO({
      token: streaming.token || '',
      refreshToken: streaming.reefresh_token || '',
    })
    const playlistsToExport = playlists.map(
      (playlist) =>
        new GetTracksByPlaylistDTO({
          streamingType: streaming.type,
          userId: toImport.userId,
          playlistId: playlist.id,
          playlistExternalId: playlist.external_id,
        }),
    )

    for (const playlist of playlistsToExport) {
      const res = await this.musicImporter.importTracksByPlaylist(credentials, playlist)
      results.push(res)
    }

    return results.reduce(
      (acc, item) => {
        return {
          exported: acc.exported + item.exported,
          saved: acc.saved + item.saved,
        }
      },
      { exported: 0, saved: 0 },
    )
  }

  async importTracksByPlaylist(playlistId: number, toImport: ImportMediaDTO) {
    const [streaming, playlist] = await Promise.all([
      this.streamingRepository.getStreaming(toImport.userId, toImport.streamingType),
      this.playlistRepository.getPlaylistById(playlistId),
    ])

    if (!streaming) {
      return new ErrorDTO(Errors.STREAMING_NOT_FOUND)
    }

    if (!playlist) {
      return new ErrorDTO(Errors.PLAYLIST_NOT_FOUND)
    }

    const data = new GetTracksByPlaylistDTO({
      streamingType: streaming.type,
      userId: toImport.userId,
      playlistId: playlist.id,
      playlistExternalId: playlist.external_id,
    })

    const credentials = new StreamingCredentialsDTO({
      token: streaming.token || '',
      refreshToken: streaming.reefresh_token || '',
    })

    const exportResult = await this.musicImporter.importTracksByPlaylist(credentials, data)

    return new ImportResultDTO(exportResult)
  }
}
