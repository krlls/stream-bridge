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
import { isServiceError } from '../../../utils/errors'

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
    const streaming = await this.streamingRepository.getStreaming(toImport.userId, toImport.streamingType)

    if (!streaming) {
      return new ErrorDTO(Errors.STREAMING_NOT_FOUND)
    }

    const { expiresIn, refresh_token, token } = streaming

    if (!expiresIn || !refresh_token || !token) {
      return new ErrorDTO(Errors.WRONG_CREDENTIALS)
    }

    const credentials = new StreamingCredentialsDTO({
      token,
      expiresIn,
      refreshToken: refresh_token,
    })

    const playlists = await this.playlistRepository.getPlaylistsByUserId(toImport.userId)
    const playlistsToExport = playlists.map(
      (playlist) =>
        new GetTracksByPlaylistDTO({
          streamingType: streaming.type,
          userId: toImport.userId,
          playlistId: playlist.id,
          playlistExternalId: playlist.external_id,
        }),
    )

    const res = await this.musicImporter.importTracksByPlaylists(credentials, playlistsToExport)

    if (isServiceError(res)) {
      return new ErrorDTO(Errors.IMPORT_TRACKS_ERROR)
    }

    return res
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

    const { expiresIn, refresh_token, token } = streaming

    if (!expiresIn || !refresh_token || !token) {
      return new ErrorDTO(Errors.WRONG_CREDENTIALS)
    }

    const data = new GetTracksByPlaylistDTO({
      streamingType: streaming.type,
      userId: toImport.userId,
      playlistId: playlist.id,
      playlistExternalId: playlist.external_id,
    })

    const credentials = new StreamingCredentialsDTO({
      token,
      expiresIn,
      refreshToken: refresh_token,
    })

    const importResult = await this.musicImporter.importTracksByPlaylists(credentials, [data])

    if (isServiceError(importResult)) {
      return importResult
    }

    return new ImportResultDTO(importResult)
  }

  async getTrackById(trackId: number) {
    const track = await this.trackRepository.getTrackById(trackId)

    if (!track) {
      return new ErrorDTO(Errors.TRACK_NOT_FOUND)
    }

    return track
  }
}
