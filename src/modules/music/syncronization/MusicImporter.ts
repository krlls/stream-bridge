import { inject, injectable } from 'inversify'

import { TYPES } from '../../../types/const'
import { IPlaylistRepository } from '../interfaces/IPlaylistRepository'
import { EPrepareResult, IStreamingClient } from '../../streaming/clients/IStreamingClient'
import { IMusicImporter } from '../interfaces/IMusicImporter'
import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { Errors, EStreamingType } from '../../../types/common'
import { GetTracksByPlaylistDTO } from '../dtos/GetTracksByPlaylistDTO'
import { ITracksRepository } from '../interfaces/ITracksRepository'
import { ErrorDTO } from '../../common/dtos/errorDTO'

@injectable()
export class MusicImporter implements IMusicImporter {
  @inject(TYPES.PlaylistRepository) private playlistRepository: IPlaylistRepository
  @inject(TYPES.TrackRepository) private trackRepository: ITracksRepository
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
    this.streamingClient.set(streamingType, credentials)

    const prepareRes = await this.streamingClient.prepare()

    if (prepareRes.result === EPrepareResult.ERROR) {
      return new ErrorDTO(Errors.PREPARE_CLIENT_ERROR)
    }

    const counter = { exported: 0, saved: 0 }
    const step = this.streamingClient.getConfig().playlistsLimit
    let offset = 0

    while (!counter.exported || !(counter.exported % step)) {
      const chunk = (await this.streamingClient.getPlaylists(offset)) || []

      if (chunk.length === 0) {
        break
      }

      const playlistsData = chunk.map((p) => p.toCreate({ userId, streamingId }))
      const savedPlaylists = await this.playlistRepository.createPlaylists(playlistsData)

      counter.saved += savedPlaylists.length
      counter.exported += chunk.length
      offset += step
    }

    return counter
  }

  async importTracksByPlaylists(credentials: StreamingCredentialsDTO, data: GetTracksByPlaylistDTO[]) {
    if (!data.length) {
      return { exported: 0, saved: 0 }
    }

    this.streamingClient.set(data[0].streamingType, credentials)

    const prepareRes = await this.streamingClient.prepare()

    if (prepareRes.result === EPrepareResult.ERROR) {
      return new ErrorDTO(Errors.PREPARE_CLIENT_ERROR)
    }

    const results = []

    for (const playlist of data) {
      const res = await this.importTracksByPlaylist(playlist)
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

  private async importTracksByPlaylist(data: GetTracksByPlaylistDTO) {
    const { playlistId, playlistExternalId, userId } = data

    const counter = { exported: 0, saved: 0 }
    const step = this.streamingClient.getConfig().playlistsLimit
    let offset = 0

    while (!counter.exported || !(counter.exported % step)) {
      const chunk = (await this.streamingClient.getTracksByPlaylist({ playlistId: playlistExternalId, offset })) || []

      if (chunk.length === 0) {
        break
      }

      const tracksData = chunk.map((t) => t.toCreate({ userId, playlistId }))
      const savedTracks = await this.trackRepository.createTracks(tracksData)

      counter.saved += savedTracks.length
      counter.exported += chunk.length
      offset += step
    }

    return counter
  }
}
