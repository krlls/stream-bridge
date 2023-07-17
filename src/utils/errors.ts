import { ServiceError, ServiceResultDTO } from '../types/common'
import { Api } from '../types/TApi'

export const isServiceError = <T extends object>(result: ServiceResultDTO<T>): result is ServiceError =>
  'error' in result

export const isSpotifyAuthError = (obj: any): obj is Api.Streaming.Token.ErrorReq => Object.hasOwn(obj, 'error')
