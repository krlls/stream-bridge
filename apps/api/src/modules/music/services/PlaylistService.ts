import { inject, injectable } from 'inversify'
import { every } from 'lodash'

import { IPlaylistService } from '../interfaces/IPlaylistService'
import { IPlaylistRepository } from '../interfaces/IPlaylistRepository'
import { TYPES } from '../../../types/const'
import { CreatePlaylistDTO } from '../dtos/CreatePlaylistDTO'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors } from '../../../types/common'
import { ImportMediaDTO } from '../dtos/ImportMediaDTO'
import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { IStreamingRepository } from '../../streaming/interfaces/IStreamingRepository'
import { ImportResultDTO } from '../dtos/ImportResultDTO'
import { IMusicImporter } from '../interfaces/IMusicImporter'
import { isServiceError } from '../../../utils/errors'
import { GetUserPlaylistsDto } from '../dtos/GetUserPlaylistsDto'
import { limits } from '../../common/const'
import { PlaylistDto } from '../dtos/PlaylistDto'
import { ImportTracksDTO } from '../dtos/ImportTracksDTO'
import { ImportLibResultDTO } from '../dtos/ImportLibResultDTO'
import { Streaming } from '../../streaming/entities/Streaming'
import { ExportPlaylistsDto } from '../dtos/ExportPlaylistsDto'
import { ITracksRepository } from '../interfaces/ITracksRepository'
import { ApiExportPlaylistDto } from '../dtos/ApiExportPlaylistDto'
import { IMusicExporter } from '../interfaces/IMusicExporter'

@injectable()
export class PlaylistService implements IPlaylistService {
  @inject(TYPES.PlaylistRepository)
  private playlistRepository: IPlaylistRepository
  @inject(TYPES.TrackRepository)
  private tracksRepository: ITracksRepository
  @inject(TYPES.StreamingRepository)
  private streamingRepository: IStreamingRepository
  @inject(TYPES.MusicImporter) private musicImporter: IMusicImporter
  @inject(TYPES.MusicExporter) private musicExporter: IMusicExporter

  async createPlayList(playlist: CreatePlaylistDTO) {
    const newPlaylist = await this.playlistRepository.createPlaylist(playlist)

    if (!newPlaylist) {
      return new ErrorDTO(Errors.PLAYLIST_CREATE_ERROR)
    }

    return newPlaylist
  }

  async getPlaylistById(id: number) {
    const playlist = await this.playlistRepository.getPlaylistById(id)

    if (!playlist) {
      return new ErrorDTO(Errors.PLAYLIST_NOT_FOUND)
    }

    return new PlaylistDto(playlist)
  }

  async getPlaylistByExternalId(externalId: string) {
    return await this.playlistRepository.getPlaylistByExternalId(externalId)
  }

  async getAllUserPlaylists(getPlaylists: GetUserPlaylistsDto) {
    const playlists = (await this.playlistRepository.getPlaylistsByUserId(getPlaylists)) || []

    return playlists.map((p) => new PlaylistDto(p))
  }

  async getUserPlaylists(getPlaylists: GetUserPlaylistsDto) {
    const { maxLimit } = limits.music.pagination
    const data = {
      ...getPlaylists,
      limit: Math.min(maxLimit, getPlaylists.limit || maxLimit),
      offset: getPlaylists.offset || 0,
    }

    const playlists = (await this.playlistRepository.getPlaylistsByUserId(data)) || []

    return playlists.map((p) => new PlaylistDto(p))
  }

  async importPlaylists(toImport: ImportMediaDTO) {
    const { userId } = toImport

    const streamingResp = await this.streamingRepository.getStreaming(toImport.userId, toImport.streamingType)
    const streaming = this.checkStreamingAfterImport(streamingResp)

    if (isServiceError(streaming)) {
      return streaming
    }

    const credentials = new StreamingCredentialsDTO({
      id: streaming.id,
      token: streaming.token,
      expiresIn: streaming.expiresIn,
      expires: streaming.expires,
      refreshToken: streaming.refresh_token,
    })

    const result = await this.musicImporter.importPlaylists({
      userId,
      credentials,
      streamingId: streaming.id,
      streamingType: streaming.type,
    })

    if (isServiceError(result)) {
      return result
    }

    return new ImportResultDTO(result)
  }

  async importAllMedia(toImport: ImportMediaDTO) {
    const streamingResp = await this.streamingRepository.getStreaming(toImport.userId, toImport.streamingType)
    const streaming = this.checkStreamingAfterImport(streamingResp)

    if (isServiceError(streaming)) {
      return streaming
    }

    const credentials = new StreamingCredentialsDTO({
      id: streaming.id,
      token: streaming.token,
      expiresIn: streaming.expiresIn,
      expires: streaming.expires,
      refreshToken: streaming.refresh_token,
    })

    const playlistsResult = await this.importPlaylists(toImport)

    if (isServiceError(playlistsResult)) {
      return playlistsResult
    }

    const playlists = await this.playlistRepository.getPlaylistsByUserId(
      new GetUserPlaylistsDto({ userId: toImport.userId, streamingType: toImport.streamingType }),
    )

    const importData = playlists.map(
      (p) =>
        new ImportTracksDTO({
          streamingType: toImport.streamingType,
          userId: toImport.userId,
          playlistId: p.id,
          playlistExternalId: p.external_id,
        }),
    )

    const tracksResult = await this.musicImporter.importTracksByPlaylists(credentials, importData)

    if (isServiceError(tracksResult)) {
      return new ErrorDTO(Errors.IMPORT_TRACKS_ERROR)
    }

    return new ImportLibResultDTO({ tracks: tracksResult, playlists: playlistsResult })
  }

  async exportPlaylists(toExport: ExportPlaylistsDto) {
    const { userId, target, ids } = toExport

    const streamingResp = await this.streamingRepository.getStreaming(userId, target)
    const streaming = this.checkStreamingAfterImport(streamingResp)

    if (isServiceError(streaming)) {
      return streaming
    }

    const playlists = await this.playlistRepository.getPlaylistByIds(ids, userId)

    if (playlists.length !== ids.length) {
      return new ErrorDTO(Errors.PLAYLIST_NOT_MATCH)
    }

    const exportDtos = (
      await Promise.all(
        playlists.map((p) => this.tracksRepository.getUserTracksByPlaylist({ userId, playlistId: p.id })),
      )
    ).map((tracks, i) => new ApiExportPlaylistDto({ targetStreamingType: target, tracks, name: playlists[i].name }))

    const credentials = new StreamingCredentialsDTO({
      id: streaming.id,
      token: streaming.token,
      expiresIn: streaming.expiresIn,
      expires: streaming.expires,
      refreshToken: streaming.refresh_token,
    })

    const result = { exported: 0, total: exportDtos.length, notFoundIds: [] as number[] }

    for (const exportDto of exportDtos) {
      const resp = await this.musicExporter.exportPlaylist(exportDto, credentials)

      if (isServiceError(resp)) {
        result.notFoundIds = [...result.notFoundIds, ...exportDto.tracks.map((t) => t.id)]

        continue
      }

      result.notFoundIds = [...result.notFoundIds, ...resp.notFoundIds]
      result.total += resp.total
      result.exported += resp.exported
    }

    return result
  }

  private checkStreamingAfterImport(streaming?: Streaming | null): Required<Streaming> | ErrorDTO {
    if (!streaming) {
      return new ErrorDTO(Errors.STREAMING_NOT_FOUND)
    }

    const { token } = streaming

    if (!every([token])) {
      return new ErrorDTO(Errors.WRONG_CREDENTIALS)
    }

    return streaming as Required<Streaming>
  }
}
