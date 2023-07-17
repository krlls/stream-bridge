import { injectable } from 'inversify'
import { faker } from '@faker-js/faker'

import { StreamingCredentialsDTO } from '../../../../../modules/music/dtos/StreamingCredentialsDTO'
import { PlaylistApiConverter } from '../converters/PlaylistApiConverter'
import { IClient } from '../../IClient'
import { StreamingClientConfig } from '../../../../../modules/music/clients/IStreamingClient'
import { ITrackApi } from '../interfaces/ISpotifyApi'
import { ExternalTrackDTO } from '../../../../../modules/music/dtos/TrackPlaylistDTO'
import { TrackApiConverter } from '../converters/TrackApiConverter'
import { serverConfig } from '../../../../../config'
import { apiLink } from '../../../../../utils/links'
import { Api } from '../../../../../types/TApi'

import * as querystring from 'querystring'

export const PLAYLISTS = 10
export const TRACKS = 150

const mockPlaylists = Array(PLAYLISTS)
  .fill(null)
  .map((_e, i) => ({
    num: i,
    name: faker.lorem.words({ min: 1, max: 3 }),
    id: faker.string.uuid(),
  }))

const mockTracks = new Map<string, ITrackApi[]>()

mockPlaylists.forEach((p) =>
  mockTracks.set(
    p.id,
    Array(TRACKS)
      .fill(null)
      .map((_e, i) => ({
        num: i,
        id: faker.string.uuid(),
        name: faker.music.songName(),
        album: p.name,
        artist: faker.person.fullName(),
      })),
  ),
)

const fakeApi = {
  getPlaylists: (offset: number) =>
    new Promise<Array<{ name: string, id: string, num: number }>>((resolve) =>
      resolve(mockPlaylists.slice(offset, offset + 50)),
    ),
  getTracks: (playlist: string, offset: number) =>
    new Promise<ITrackApi[]>((resolve) => {
      const tracks = mockTracks.get(playlist)
      !tracks ? resolve([]) : resolve(tracks.slice(offset, offset + 50))
    }),
}

@injectable()
export class SpotifyClient implements IClient {
  private playlistConverter = new PlaylistApiConverter()
  private trackConverter = new TrackApiConverter()
  private redirectLink = apiLink(
    Api.Streaming.PREFIX,
    Api.Streaming.Token.PATCH,
    '/' + Api.Streaming.EApiStreamingType.SPOTIFY,
  )
  private _scope: string[] = ['user-read-private', 'user-read-email']
  private spotifyAuthUrl = 'https://accounts.spotify.com/authorize?'

  private get scope(): string {
    return this._scope.join(' ')
  }

  getConfig(): StreamingClientConfig {
    return {
      playlistsLimit: 50,
    }
  }

  async getPlaylists(_credentials: StreamingCredentialsDTO, offset: number) {
    const playlists = await fakeApi.getPlaylists(offset)

    return playlists.map(this.playlistConverter.from)
  }

  async getTracksByPlaylist(
    _credentials: StreamingCredentialsDTO,
    data: {
      playlistId: string,
      offset: number,
    },
  ): Promise<ExternalTrackDTO[]> {
    const tracks = await fakeApi.getTracks(data.playlistId, data.offset)

    return tracks.map(this.trackConverter.from)
  }

  async getLoginUrl(): Promise<string | null> {
    const query = querystring.stringify({
      response_type: 'code',
      client_id: serverConfig.spotifyClientId,
      scope: this.scope,
      redirect_uri: this.redirectLink,
      state: 1234,
    })

    return this.spotifyAuthUrl + query
  }
}
