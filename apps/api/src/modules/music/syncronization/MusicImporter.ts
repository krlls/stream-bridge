import { inject, injectable } from 'inversify'

import { TYPES } from '../../../types/const'
import { IPlaylistRepository } from '../interfaces/IPlaylistRepository'
import { EPrepareResult, IStreamingClient } from '../../streaming/clients/IStreamingClient'
import { IMusicImporter } from '../interfaces/IMusicImporter'
import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { Errors, EStreamingType, Uid } from '../../../types/common'
import { ImportTracksDTO } from '../dtos/ImportTracksDTO'
import { ITracksRepository } from '../interfaces/ITracksRepository'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { genUid } from '../../../utils/app'
import { IStreamingRepository } from '../../streaming/interfaces/IStreamingRepository'
import { ImportLogger } from '../../../utils/logger'
import { CreateStreamingTokenDTO } from '../../streaming/dtos/CreateStreamingTokenDTO'

@injectable()
export class MusicImporter implements IMusicImporter {
  @inject(TYPES.PlaylistRepository)
  private playlistRepository: IPlaylistRepository
  @inject(TYPES.TrackRepository) private trackRepository: ITracksRepository
  @inject(TYPES.StreamingRepository) private streamingRepository: IStreamingRepository
  @inject(TYPES.Client) private streamingClient: IStreamingClient

  async importPlaylists({
    userId,
    streamingId,
    credentials,
    streamingType,
  }: {
    userId: number,
    streamingId: number,
    streamingType: EStreamingType,
    credentials: StreamingCredentialsDTO,
  }) {
    const importId = genUid()

    const prepareError = await this.prepareClient(streamingType, credentials)

    if (prepareError) {
      return prepareError
    }

    const counter = { exported: 0, saved: 0 }
    const step = this.streamingClient.getConfig().playlistsLimit
    let offset = 0

    while ((!counter.exported && offset === 0) || !(counter.exported % step)) {
      const chunk = (await this.streamingClient.getPlaylists(offset)) || []

      if (chunk.length === 0) {
        break
      }

      const playlistsData = chunk.map((p) => p.toCreate({ userId, streamingId, importId }))
      const savedPlaylists = await this.playlistRepository.upsertPlaylists(playlistsData)

      counter.saved += savedPlaylists
      counter.exported += chunk.length
      offset += step
    }

    const deleted = await this.playlistRepository.purgeMismatchedPlaylistsByImportId({
      streamingType,
      importId,
      userId,
    })

    return { ...counter, ...deleted }
  }

  async importTracksByPlaylists(credentials: StreamingCredentialsDTO, data: ImportTracksDTO[]) {
    const importId = genUid()

    if (!data.length) {
      return { exported: 0, saved: 0 }
    }

    const prepareError = await this.prepareClient(data[0].streamingType, credentials)

    if (prepareError) {
      return prepareError
    }

    const results = []

    for (const playlist of data) {
      const res = await this.importTracksByPlaylist(playlist, importId)
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

  private async importTracksByPlaylist(data: ImportTracksDTO, importId: Uid) {
    const { playlistId, playlistExternalId, userId } = data
    const counter = { exported: 0, saved: 0 }
    const step = this.streamingClient.getConfig().playlistsLimit
    let offset = 0

    while ((!counter.exported && offset === 0) || !(counter.exported % step)) {
      const chunk =
        (await this.streamingClient.getTracksByPlaylist({
          playlistId: playlistExternalId,
          offset,
        })) || []

      if (chunk.length === 0) {
        break
      }

      const tracksData = chunk.map((t) => t.toCreate({ userId, playlistId, importId }))
      const savedTracks = await this.trackRepository.upsertTracks(tracksData)

      counter.saved += savedTracks
      counter.exported += chunk.length
      offset += step
    }

    const deleted = await this.trackRepository.purgeMismatchedTracksByImportId(playlistId, importId)

    return { ...counter, ...deleted }
  }

  private async updateStreaming(streamingId: number, data: CreateStreamingTokenDTO) {
    const result = await this.streamingRepository.updateStreamingWithToken(streamingId, data)

    if (result) {
      ImportLogger.info('updateStreaming', streamingId, 'success')

      return
    }

    ImportLogger.error('updateStreaming', streamingId)
  }

  private async prepareClient(type: EStreamingType, credentials: StreamingCredentialsDTO) {
    ImportLogger.info('prepareClient', type)
    this.streamingClient.set(type, credentials)

    if (this.needsUpdate(credentials.expires)) {
      await this.updateToken(credentials)
    }

    const prepareRes = await this.streamingClient.prepare()

    if (prepareRes.result === EPrepareResult.ERROR) {
      ImportLogger.error('prepareClient', type, 'error')

      return new ErrorDTO(Errors.PREPARE_CLIENT_ERROR)
    }

    if (prepareRes.data) {
      await this.updateStreaming(credentials.streamingId, prepareRes.data)
    }

    return
  }

  private async updateToken(credentials: StreamingCredentialsDTO) {
    const newToken = await this.streamingClient.updateToken()

    if (!newToken) {
      ImportLogger.error('Failed to update the token')

      return
    }

    await this.updateStreaming(credentials.streamingId, newToken)

    return
  }

  private needsUpdate(expires: number) {
    return expires < Date.now()
  }
}
