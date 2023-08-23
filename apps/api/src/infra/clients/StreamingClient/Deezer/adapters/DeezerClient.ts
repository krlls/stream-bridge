import { injectable } from 'inversify'
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Api } from 'api-types'

import { StreamingCredentialsDTO } from '../../../../../modules/music/dtos/StreamingCredentialsDTO'
import { IClient } from '../../IClient'
import { EPrepareResult, StreamingClientConfig } from '../../../../../modules/streaming/clients/IStreamingClient'
import { ITokenResp, Paginated, Playlist, Track } from '../interfaces/DeezerApi'
import { serverConfig } from '../../../../../config'
import { apiLink, createPatch } from '../../../../../utils/links'
import { StreamingLogger } from '../../../../../utils/logger'
import { TokenApiConverter } from '../converters/TokenApiConverter'
import { PlaylistApiConverter } from '../converters/PlaylistApiConverter'
import { EStreamingType } from '../../../../../types/common'
import { StreamingPrepareResultDTO } from '../../../../../modules/streaming/dtos/StreamingPrepareResultDTO'
import { TrackApiConverter } from '../converters/TrackApiConverter'

import * as querystring from 'querystring'

@injectable()
export class DeezerClient implements IClient {
  tokenConverter = new TokenApiConverter()
  playlistApiConverter = new PlaylistApiConverter()
  trackApiConverter = new TrackApiConverter()

  private connectUrl = 'https://connect.deezer.com'
  private baseUrl = 'https://api.deezer.com'
  private authUrl = '/oauth/auth.php?'
  private scope = ['offline_access', 'manage_library', 'basic_access', 'email'].join(',')
  private logger = new StreamingLogger(EStreamingType.DEEZER)

  private _client: AxiosInstance

  private get client() {
    if (!this._client) {
      throw Error('Client not init')
    }

    return this._client
  }

  async prepare(credentialsDto: StreamingCredentialsDTO) {
    try {
      this._client = await this.setUpClient(credentialsDto.token)

      return new StreamingPrepareResultDTO(EPrepareResult.SUCCESS)
    } catch (e: any) {
      this.logger.error('prepare', e?.message)

      return new StreamingPrepareResultDTO(EPrepareResult.ERROR)
    }
  }

  getConfig(): StreamingClientConfig {
    return {
      playlistsLimit: 50,
    }
  }

  async getPlaylists(offset: number) {
    const limit = this.getConfig().playlistsLimit

    try {
      const { data } = await this.client.get<Paginated<Playlist>>('/user/me/playlists', {
        params: {
          index: offset,
          limit,
        },
      })

      if (!data?.data?.length) {
        return []
      }

      return (data?.data || []).map(this.playlistApiConverter.from)
    } catch {
      this.logger.error('getPlaylists')

      return []
    }
  }

  async getTracksByPlaylist({ offset, playlistId }: { playlistId: string, offset: number }) {
    const limit = this.getConfig().playlistsLimit

    try {
      const { data } = await this.client.get<Paginated<Track>>(`/playlist/${playlistId}/tracks`, {
        params: {
          index: offset,
          limit,
        },
      })

      if (!data?.data?.length) {
        return []
      }

      return (data?.data || []).map(this.trackApiConverter.from)
    } catch {
      this.logger.error('getPlaylists')

      return []
    }
  }

  getLoginUrl(state: string): string {
    const query = querystring.stringify({
      app_id: serverConfig.deezerClientId,
      perms: this.scope,
      redirect_uri: this.redirectLink(state),
    })

    return createPatch(this.connectUrl, this.authUrl, query)
  }

  async getToken(code: string) {
    try {
      const tokenData: AxiosResponse<ITokenResp> = await axios.request({
        method: 'GET',
        url: '/oauth/access_token.php',
        baseURL: this.connectUrl,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        params: {
          code,
          app_id: serverConfig.deezerClientId,
          secret: serverConfig.deezerClientSecret,
          output: 'json',
        },
      })

      this.logger.info('getToken', tokenData.data.access_token.slice(-10))

      return this.tokenConverter.from(tokenData.data)
    } catch (e: any) {
      this.logger.error('getToken', e?.response?.status, e?.response?.statusText)

      return null
    }
  }

  private async setUpClient(token: string) {
    const client = axios.create({ baseURL: this.baseUrl, params: { access_token: token } })
    const res = await client.get('/user/me')

    if (!res.data?.error && res.status === 200) {
      return client
    }

    throw Error('Token not valid')
  }

  private redirectLink = (state: string) =>
    apiLink(
      Api.Streaming.PREFIX,
      Api.Streaming.Token.PATCH,
      '/' + Api.Streaming.EApiStreamingType.DEEZER,
      '?state=',
      state,
    )
}
