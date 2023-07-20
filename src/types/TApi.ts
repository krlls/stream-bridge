type ApiErrorResp = { error: string }
type Response<T> = T | ApiErrorResp

export namespace Api {
  export namespace User {
    export const PREFIX = '/user'

    export namespace Create {
      export const URL = '/create'

      export type Req = {
        login: string,
        name: string,
        pass: string,
      }

      export type Resp = Response<{
        id: string,
        login: string,
        name: string,
      }>
    }

    export namespace GetProfile {
      export const URL = '/profile'

      export type Resp = Response<{
        id: string,
        login: string,
        name: string,
      }>
    }
  }

  export namespace Auth {
    export const PREFIX = '/auth'

    export namespace Login {
      export const URL = '/login'

      export type Req = {
        login: string,
        pass: string,
      }

      export type Resp = Response<{
        token: string,
      }>
    }
  }

  export namespace Streaming {
    export const PREFIX = '/streaming'

    export enum EApiStreamingType {
      SPOTIFY = 'spotify',
    }

    export namespace Token {
      export const PATCH = '/token'
      export const STREAMING_TYPE = '/:type'
      export const URL = PATCH + STREAMING_TYPE

      export type SuccessReq = { code: string, state: string }
      export type ErrorReq = { error: string, state: string }

      export type Req = SuccessReq | ErrorReq

      export type Resp = Response<{
        result: string,
      }>
    }

    export namespace Auth {
      export const URL = '/auth/:type'

      export type Resp = Response<{
        url: string,
      }>
    }
  }

  export namespace Import {
    export const PREFIX = '/import'

    export namespace Playlists {
      export const URL = '/playlists'

      export type Req = {
        streamingType: Streaming.EApiStreamingType,
      }

      export type Resp = Response<{
        exported: number,
        saved: number,
        deleted: number,
      }>
    }

    export namespace Tracks {
      export const URL = '/tracks'

      export type Req = {
        playlistId: number,
      }

      export type Resp = Response<{
        exported: number,
        saved: number,
        deleted: number,
      }>
    }
  }
}
