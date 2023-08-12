import { Api } from 'api-types'

import { Nullable, ServiceError, ServiceResultDTO } from '../types/common'

export const isServiceError = <T extends Nullable<object>>(result: ServiceResultDTO<T>): result is ServiceError =>
  result ? 'error' in result : false

export const isSpotifyAuthError = (obj: any): obj is Api.Streaming.Token.ErrorReq => Object.hasOwn(obj, 'error')
