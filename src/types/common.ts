export interface Converter<F, T> {
  from(from: F): T,
  to?(to: T): F,
}

export enum E_NODE_ENV {
  TEST = 'test',
  DEV = 'development',
  PROD = 'production',
}

export interface ServiceError {
  error: Errors,
}

export type ServiceResultDTO<T> = T | ServiceError
export enum Errors {
  AUTH_INCORRECT = 'Inkorrect credentials',

  USER_EXSIT = 'User already exist',
  USER_CREATE_ERROR = 'User not created',
  USER_NOT_FOUND = 'user not found',
  USER_UPDATE_ERROR = 'User update error',

  PLAYLIST_CREATE_ERROR = 'Playlist not created',
  PLAYLIST_NOT_FOUND = 'Playlist not found',

  TRACK_CREATE_ERROR = 'Track not created',

  STREAMING_CREATE_ERROR = 'Streaming create error',
  STREAMING_NOT_FOUND = 'Streaming not found',
}

export enum EStreamingType {
  SPOTIFY = 'SPOTIFY',
}

export type Factory<A, B extends unknown[]> = (...args: B) => A
export interface ContextStrategy<A, B extends unknown[]> {
  set(strategy: A, ...args: B): void,
}
