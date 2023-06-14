import { ServiceError, ServiceResultDTO } from '../types/common'

export const isServiceError = <T extends object>(result: ServiceResultDTO<T>): result is ServiceError =>
  'error' in result
