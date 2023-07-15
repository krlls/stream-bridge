import { inject, injectable } from 'inversify'

import { TYPES } from '../../../types/const'
import { IPlaylistRepository } from '../interfaces/IPlaylistRepository'
import { IStreamingClient } from '../clients/IStreamingClient'
import { IMusicImporter } from '../interfaces/IMusicImporter'
import { GetPlaylistsDTO } from '../dtos/GetPlaylistsDTO'
import { EStreamingType } from '../../../types/common'

@injectable()
export class MusicImporter implements IMusicImporter {
  @inject(TYPES.PlaylistRepository) private playlistRepository: IPlaylistRepository
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
    credentials: GetPlaylistsDTO,
  }) {
    this.streamingClient.set(streamingType, credentials)

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
}
