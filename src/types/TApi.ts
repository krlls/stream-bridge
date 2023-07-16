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
      export const URL = '/token/:type'

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
}
