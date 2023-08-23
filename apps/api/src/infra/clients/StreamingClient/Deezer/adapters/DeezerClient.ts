import { injectable } from 'inversify'
import axios, { AxiosResponse } from 'axios'
import { Api } from 'api-types'

import { StreamingCredentialsDTO } from '../../../../../modules/music/dtos/StreamingCredentialsDTO'
import { IClient } from '../../IClient'
import { EPrepareResult, StreamingClientConfig } from '../../../../../modules/streaming/clients/IStreamingClient'
import { ITokenResp } from '../interfaces/DeezerApi'
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

  private connectUrl = 'https://connect.deezer.com'
  private authUrl = '/oauth/auth.php?'
  private scope = ['offline_access', 'manage_library'].join(',')
  private logger = new StreamingLogger(EStreamingType.DEEZER)

  async prepare(_credentialsDto: StreamingCredentialsDTO) {
    try {
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
    return []
  }

  async getTracksByPlaylist(_data: { playlistId: string, offset: number }) {
    return []
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

  private redirectLink = (state: string) =>
    apiLink(
      Api.Streaming.PREFIX,
      Api.Streaming.Token.PATCH,
      '/' + Api.Streaming.EApiStreamingType.DEEZER,
      '?state=',
      state,
    )
}
