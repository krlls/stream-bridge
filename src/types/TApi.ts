import { EStreamingType } from './common'

type ApiErrorResp = { error: string }
type Response<T> = T | ApiErrorResp
type Paginated<T> = { items: T[] }

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

  export namespace Music {
    export const PREFIX = '/music'

    export namespace Playlists {
      export const PATCH = '/playlists'
      export const STREAMING_TYPE = '/:type'
      export const URL = PATCH + STREAMING_TYPE

      export type Req = {
        offset: number,
        limit?: number,
      }

      export type Playlist = {
        id: number,
        externalId: string,
        name: string,
        streamingType: EStreamingType,
      }

      export type Resp = Response<Paginated<Playlist>>
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

      export type Track = {
        id: number,
        playlistId: number,
        externalId: string,
        name: string,
        artist: string,
        album: string,
      }

      export type Resp = Response<Paginated<Track>>
    }
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Playlist:
 *       type: object
 *       required:
 *         - id
 *         - externalId
 *         - name
 *         - streamingType
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the Playlist
 *         externalId:
 *           type: number
 *           description: External id from streaming service
 *         name:
 *           type: string
 *           description: Playlist title
 *         streamingType:
 *           type: string
 *           enum: [spotify]
 *           description: Type of streaming service
 *       example:
 *         id: 4
 *         externalId: dsf5564dsf564ds
 *         name: My awesome playlist
 *         streamingType: SPOTIFY
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Track:
 *       type: object
 *       required:
 *        - id: number,
 *        - playlistId: number,
 *        - externalId: string,
 *        - name: string,
 *        - artist: string,
 *        - album: string,
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the Track
 *
 *         playlistId:
 *           type: number
 *
 *         externalId:
 *           type: string
 *           description: External id from streaming service
 *
 *         name:
 *           type: string
 *           description: Track title
 *
 *         artist:
 *           type: string
 *           description: String with artist(s) names
 *
 *         album:
 *           type: string
 *           description: Name of album
 *
 *       example:
 *         id: 4
 *         externalId: dsf5564dsf564ds
 *         name: My track
 *         artist: Some artist name
 *         album: Some album name
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResult:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *       example:
 *        error: Some error message
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ValidationError:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: "Validation error"
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "username"
 *               message:
 *                 type: string
 *                 example: "Username must be at least 4 characters long"
 *       required:
 *         - status
 *         - message
 *         - errors
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StreamingTokenResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status message indicating success or error.
 *           enum:
 *             - success
 *             - error
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
