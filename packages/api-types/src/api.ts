import { EStreamingType, Paginated, Response } from './index'

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

    export namespace Update {
      export const URL = '/update'

      export type Req = {
        login?: string,
        name?: string,
        pass?: string,
      }

      export type Resp = Response<{
        id: number,
        login: string,
        name: string,
      }>
    }

    export namespace GetProfile {
      export const URL = '/profile'

      export type Resp = Response<{
        id: number,
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
      DEEZER = 'deezer',
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
      export const PATCH = '/auth'
      export const STREAMING_TYPE = '/:type'
      export const URL = PATCH + STREAMING_TYPE

      export type Resp = Response<{
        url: string,
      }>
    }

    export namespace List {
      export const URL = '/list'

      export type Streaming = {
        id: number,
        type: EStreamingType,
        playlists: number,
        tracks: number,
      }

      export type Resp = Response<Paginated<Streaming>>
    }

    export namespace Delete {
      export const PATCH = '/delete'
      export const STREAMING_TYPE = '/:type'
      export const URL = PATCH + STREAMING_TYPE

      export type Resp = Response<{
        result: string,
      }>
    }

    export namespace Available {
      export const URL = '/available'

      export type Streaming = {
        type: EStreamingType,
        name: string,
      }

      export type Resp = Response<Paginated<Streaming>>
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

    export namespace Lib {
      export const URL = '/lib'

      export type Req = {
        streamingType: Streaming.EApiStreamingType,
      }

      export type Resp = Response<{
        tracks: {
          exported: number,
          saved: number,
        },
        playlists: {
          exported: number,
          saved: number,
        },
      }>
    }
  }

  export namespace Export {
    export const PREFIX = '/export'

    export namespace Tracks {
      export const URL = '/tracks'

      export type Req = {
        trackIds: number[],
        playlistId: number,
      }

      export type Resp = Response<{
        total: number,
        exported: number,
        notFoundIds: number[],
      }>
    }

    export namespace Playlists {
      export const URL = '/playlists'

      export type Req = {
        playlistIds: number[],
        target: Api.Streaming.EApiStreamingType,
      }

      export type Resp = Response<{
        total: number,
        exported: number,
        notFoundIds: number[],
      }>
    }
  }

  export namespace Music {
    export const PREFIX = '/music'

    export type Playlist = {
      id: number,
      externalId: string,
      name: string,
      streamingType: EStreamingType,
      cover?: string,
    }

    export type Track = {
      id: number,
      playlistId: number,
      externalId: string,
      name: string,
      artist: string,
      album: string,
    }

    export namespace Playlists {
      export const PATCH = '/playlists'
      export const STREAMING_TYPE = '/:type'
      export const URL = PATCH + STREAMING_TYPE

      export type Req = {
        offset: number,
        limit?: number,
      }

      export type Resp = Response<Paginated<Playlist>>
    }

    export namespace Playlist {
      export const PATCH = '/playlist'
      export const STREAMING_TYPE = '/:type'
      export const URL = PATCH + STREAMING_TYPE

      export type Req = {
        id: number,
      }

      export type Resp = Response<Playlist>
    }

    export namespace Tracks {
      export const PATCH = '/tracks'
      export const STREAMING_TYPE = '/:type'
      export const URL = PATCH + STREAMING_TYPE

      export type Req = {
        playlistId: number,
        offset: number,
        limit?: number,
      }

      export type Resp = Response<Paginated<Track>>
    }
  }
}
