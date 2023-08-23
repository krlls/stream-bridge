import { injectable } from 'inversify'
import axios, { Axios, AxiosResponse } from 'axios'
import { MaxInt } from '@spotify/web-api-ts-sdk/src/types'
import { Api } from 'api-types'

import { StreamingCredentialsDTO } from '../../../../../modules/music/dtos/StreamingCredentialsDTO'
import { IClient } from '../../IClient'
import { EPrepareResult, StreamingClientConfig } from '../../../../../modules/streaming/clients/IStreamingClient'
import { ITokenResp } from '../interfaces/DeezerApi'
import { ExternalTrackDTO } from '../../../../../modules/music/dtos/ExternalTrackDTO'
import { serverConfig } from '../../../../../config'
import { apiLink, createPatch } from '../../../../../utils/links'
import { StreamingLogger } from '../../../../../utils/logger'
import { TokenApiConverter } from '../converters/TokenApiConverter'
import { EStreamingType } from '../../../../../types/common'
import { StreamingPrepareResultDTO } from '../../../../../modules/streaming/dtos/StreamingPrepareResultDTO'

import * as querystring from 'querystring'

@injectable()
export class DeezerClient implements IClient {
  tokenConverter = new TokenApiConverter()

  private _client: Axios
  private logger = new StreamingLogger(EStreamingType.SPOTIFY)
  private baseUrl = 'https://api.deezer.com'
  private authUrl = '/oauth/auth.php?'
  private scope = ['offline_access', 'manage_library'].join(',')
  private get client(): Axios {
    if (!this._client) {
      throw Error('Client not defined')
    }

    return this._client
  }

  async prepare(credentialsDto: StreamingCredentialsDTO) {
    try {
      this._client = await this.setupClient(credentialsDto)

      return new StreamingPrepareResultDTO(EPrepareResult.SUCCESS)
    } catch (e: any) {
      this.logger.error('prepare', e?.message)

      return new StreamingPrepareResultDTO(EPrepareResult.SUCCESS)
    }
  }

  getConfig(): StreamingClientConfig {
    return {
      playlistsLimit: 50,
    }
  }

  async getPlaylists(_offset: number) {
    const limit = this.getConfig().playlistsLimit as MaxInt<50>

    if (!limit) {
      this.logger.error('getPlaylists', 'empty result')

      return []
    }

    this.logger.info('getPlaylists', 'Playlists:')

    return []
  }

  async getTracksByPlaylist(_data: { playlistId: string, offset: number }): Promise<ExternalTrackDTO[]> {
    if (!this.client) {
      return []
    }

    try {
      this.logger.info('getTracksByPlaylist', 'Tracks:')

      return []
    } catch (e) {
      this.logger.error(e)
    }

    return []
  }

  getLoginUrl(state: string): string {
    const query = querystring.stringify({
      app_id: serverConfig.deezerClientId,
      perms: this.scope,
      redirect_uri: this.redirectLink(state),
    })

    return createPatch('https://connect.deezer.com', this.authUrl, query)
  }

  async getToken(code: string) {
    try {
      const tokenData: AxiosResponse<ITokenResp> = await axios.request({
        method: 'GET',
        url: '/oauth/access_token.php',
        baseURL: 'https://connect.deezer.com',
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
  private async setupClient(credentials: StreamingCredentialsDTO): Promise<Axios> {
    const client = new Axios({ baseURL: this.baseUrl, params: { access_token: credentials.token } })

    const res = await client.get('/user/me')

    if (res.status !== 200) {
      throw Error('No client!')
    }

    return client
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
