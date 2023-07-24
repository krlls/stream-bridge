import { Api } from 'api-types'

import { ServiceError, ServiceResultDTO } from '../types/common'

export const isServiceError = <T extends object>(result: ServiceResultDTO<T>): result is ServiceError =>
  'error' in result

export const isSpotifyAuthError = (obj: any): obj is Api.Streaming.Token.ErrorReq => Object.hasOwn(obj, 'error')
