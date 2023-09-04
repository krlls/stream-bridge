import { inject, injectable } from 'inversify'

import { TYPES } from '../../../types/const'
import { IStreamingClient } from '../../streaming/clients/IStreamingClient'
import { IMusicExporter } from '../interfaces/IMusicExporter'
import { StreamingCredentialsDTO } from '../dtos/StreamingCredentialsDTO'
import { MusicSync } from './MusicSync'
import { IStreamingRepository } from '../../streaming/interfaces/IStreamingRepository'
import { isServiceError } from '../../../utils/errors'
import { ApiFindTrackDto } from '../dtos/ApiFindTrackDto'
import { ExternalTrackDTO } from '../dtos/ExternalTrackDTO'
import { Track } from '../entities/Track'
import { calcMatchScore } from '../../../utils/match'
import { ApiExportTracksDto } from '../dtos/ApiExportTracksDto'

@injectable()
export class MusicExporter extends MusicSync implements IMusicExporter {
  @inject(TYPES.StreamingRepository) protected streamingRepository: IStreamingRepository
  @inject(TYPES.Client) protected streamingClient: IStreamingClient

  async exportTracks({ tracks, streamingType, playlistId }: ApiExportTracksDto, credentials: StreamingCredentialsDTO) {
    const prepareRes = await this.prepareClient(streamingType, credentials)

    if (isServiceError(prepareRes)) {
      return prepareRes
    }

    const tracksFromSearch = await this.findTracks(tracks)

    const { result, notFound } = tracksFromSearch

    const resp = { total: tracks.length, exported: result.length, notFoundIds: notFound.map((t) => t.id) }

    if (!result.length) {
      return resp
    }

    await this.streamingClient.addTrackToPlaylist(
      tracksFromSearch.result.map((t) => String(t.id)),
      playlistId,
    )

    return resp
  }

  private async findTracks(tracks: Track[]) {
    const resultTracks: ExternalTrackDTO[] = []
    const notFound: Track[] = []

    for (const track of tracks) {
      const request = new ApiFindTrackDto(track)
      const results = await this.streamingClient.findTrack(request)

      if (!results.length) {
        notFound.push(track)

        continue
      }

      const matched: ExternalTrackDTO | undefined = this.bestMatch(track, results)

      matched ? resultTracks.push(matched) : notFound.push(track)
    }

    return { result: resultTracks, notFound }
  }

  private bestMatch(original: Track, tracks: ExternalTrackDTO[]): ExternalTrackDTO | undefined {
    const minimumMatch = 2
    const bestMatch: { score: number, track?: ExternalTrackDTO } = { score: 0, track: undefined }

    tracks.forEach((track) => {
      const score =
        calcMatchScore(original.name, track.name) +
        calcMatchScore(original.artist, track.artist) +
        calcMatchScore(original.album, track.album)

      if (score > minimumMatch && score > bestMatch.score) {
        bestMatch.score = score
        bestMatch.track = track
      }
    })

    return bestMatch.track
  }
}
