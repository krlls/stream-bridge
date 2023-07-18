import { injectable } from 'inversify'
import { faker } from '@faker-js/faker'
import axios, { AxiosResponse } from 'axios'
import base64url from 'base64url'

import { StreamingCredentialsDTO } from '../../../../../modules/music/dtos/StreamingCredentialsDTO'
import { PlaylistApiConverter } from '../converters/PlaylistApiConverter'
import { IClient } from '../../IClient'
import { EPrepareResult, StreamingClientConfig } from '../../../../../modules/streaming/clients/IStreamingClient'
import { ITokenResp, ITrackApi, IUpdateTokenResp } from '../interfaces/ISpotifyApi'
import { ExternalTrackDTO } from '../../../../../modules/music/dtos/TrackPlaylistDTO'
import { TrackApiConverter } from '../converters/TrackApiConverter'
import { serverConfig } from '../../../../../config'
import { apiLink, createPatch } from '../../../../../utils/links'
import { Api } from '../../../../../types/TApi'
import { StreamingLogger } from '../../../../../utils/logger'
import { TokenApiConverter } from '../converters/TokenApiConverter'
import { EStreamingType } from '../../../../../types/common'
import { StreamingPrepareResultDTO } from '../../../../../modules/streaming/dtos/StreamingPrepareResultDTO'

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
  getPlaylists: (offset: number, _token: string) =>
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
  private tokenConverter = new TokenApiConverter()
  private logger = new StreamingLogger(EStreamingType.SPOTIFY)
  private baseUrl = 'https://accounts.spotify.com'
  private spotifyAuthUrl = '/authorize?'
  private _scope: string[] = ['user-read-private', 'user-read-email']
  private token: string = ''
  private redirectLink = apiLink(
    Api.Streaming.PREFIX,
    Api.Streaming.Token.PATCH,
    '/' + Api.Streaming.EApiStreamingType.SPOTIFY,
  )
  private get authHeader() {
    const { spotifyClientId, spotifyClientSecret } = serverConfig

    return 'Basic ' + base64url(`${spotifyClientId}:${spotifyClientSecret}`)
  }

  private get scope(): string {
    return this._scope.join(' ')
  }

  async prepare(credentials: StreamingCredentialsDTO) {
    const token = await this.updateToken(credentials.refreshToken)

    if (!token) {
      return new StreamingPrepareResultDTO(EPrepareResult.ERROR)
    }

    this.token = token

    return new StreamingPrepareResultDTO(EPrepareResult.SUCCESS)
  }

  getConfig(): StreamingClientConfig {
    return {
      playlistsLimit: 50,
    }
  }

  async getPlaylists(offset: number) {
    const playlists = await fakeApi.getPlaylists(offset, this.token)

    return playlists.map(this.playlistConverter.from)
  }

  async getTracksByPlaylist(data: { playlistId: string, offset: number }): Promise<ExternalTrackDTO[]> {
    const tracks = await fakeApi.getTracks(data.playlistId, data.offset)

    return tracks.map(this.trackConverter.from)
  }

  async getLoginUrl(state: string): Promise<string | null> {
    const query = querystring.stringify({
      state,
      response_type: 'code',
      client_id: serverConfig.spotifyClientId,
      scope: this.scope,
      redirect_uri: this.redirectLink,
    })

    return createPatch(this.baseUrl, this.spotifyAuthUrl, query)
  }

  async getToken(code: string) {
    try {
      const tokenData: AxiosResponse<ITokenResp> = await axios.request({
        method: 'POST',
        url: '/api/token',
        baseURL: this.baseUrl,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: this.authHeader,
        },
        data: {
          code,
          grant_type: 'authorization_code',
          redirect_uri: this.redirectLink,
        },
      })

      return this.tokenConverter.from(tokenData.data)
    } catch (e: any) {
      this.logger.error('getToken', e?.response?.status, e?.response?.statusText)

      return null
    }
  }

  private async updateToken(refreshToken: string) {
    try {
      const tokenData: AxiosResponse<IUpdateTokenResp> = await axios.request({
        method: 'POST',
        url: '/api/token',
        baseURL: this.baseUrl,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: this.authHeader,
        },
        data: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
      })

      return tokenData?.data?.access_token
    } catch (e: any) {
      this.logger.error('updateToken', e?.response?.status, e?.response?.statusText)

      return null
    }
  }
}
