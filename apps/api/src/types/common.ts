export interface Converter<F, T> {
  from(from: F): T,
  to?(to: T): F,
}

export type Uid = string
export type Nullable<T> = T | null | undefined

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

  USER_EXISTS = 'User already exist',
  USER_CREATE_ERROR = 'User not created',
  USER_NOT_FOUND = 'user not found',
  USER_UPDATE_ERROR = 'User update error',

  TOKEN_NOT_VALID = 'Token not valid',
  CREATE_TOKEN_ERROR = 'create token error',

  PREPARE_CLIENT_ERROR = 'Prepare client error',

  PLAYLIST_CREATE_ERROR = 'Playlist not created',
  PLAYLIST_NOT_FOUND = 'Playlist not found',
  PLAYLIST_NOT_MATCH = 'Playlist(s) not match with streaming',

  TRACK_CREATE_ERROR = 'Track not created',
  TRACK_NOT_FOUND = 'Track not found',
  TRACKS_NOT_FOUND = 'Tracks not found',

  STREAMING_CREATE_ERROR = 'Streaming create error',
  STREAMING_UPDATE_ERROR = 'Streaming update error',
  STREAMING_NOT_FOUND = 'Streaming not found',
  STREAMING_EXISTS = 'Streaming type already exists',
  WRONG_CREDENTIALS = 'Wrong credentials, needs reconnect to streaming service',

  CREATE_URL_ERROR = 'Create streaming url error',

  IMPORT_TRACKS_ERROR = 'Import tracks error',
}

export enum EStreamingType {
  SPOTIFY = 'SPOTIFY',
  DEEZER = 'DEEZER',
  TIDAL = 'TIDAL',
}

export type Factory<A, B extends unknown[]> = (...args: B) => A
export interface ContextStrategy<A, B extends unknown[]> {
  set(strategy: A, ...args: B): void,
}
