import Router from 'koa-router'
import { isEmpty } from 'lodash'
import { Api } from 'api-types'

import { respond200plain } from '../utils/response'
import { ApiLogger, showNotEmpty } from '../utils/logger'
import { authRouter } from './authRoutes'
import { userRouter } from './userRoutes'
import { streamingRouter } from './streamingRoutes'
import { importRouter } from './importRoutes'
import { swaggerMiddleware, swaggerRouter } from '../swagger/swagger'
import { serverConfig } from '../config'
import { musicRouter } from './musicRoutes'

const rootRouter = new Router()

export const routers = (app: any) => {
  rootRouter.use(async (ctx, next) => {
    ApiLogger.info(ctx, showNotEmpty(isEmpty(ctx.params), ctx.body))
    await next()
  })
  rootRouter.get('/', (ctx) => respond200plain(ctx, '🔥 Hello world!'))

  rootRouter.use(Api.User.PREFIX, userRouter.routes())
  rootRouter.use(Api.Auth.PREFIX, authRouter.routes())
  rootRouter.use(Api.Streaming.PREFIX, streamingRouter.routes())
  rootRouter.use(Api.Import.PREFIX, importRouter.routes())
  rootRouter.use(Api.Music.PREFIX, musicRouter.allowedMethods(), musicRouter.routes())

  if (!serverConfig.isProduction) {
    app.use(swaggerRouter.routes(), swaggerRouter.allowedMethods())
    app.use(swaggerMiddleware)
  }

  app.use(rootRouter.routes())
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
 *         cover:
 *           type: string
 *           description: Cover image uri
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
 *     Streaming:
 *       type: object
 *       required:
 *        - id: integer,
 *        - type: string,
 *        - playlists: integer,
 *        - tracks: integer,
 *       properties:
 *         id:
 *           description: The auto-generated id of the streaming
 *         type:
 *           description: Name of streaming
 *         playlists:
 *           description: Playlists count
 *         tracks:
 *           description: tracks count
 *
 *       example:
 *         id: 4
 *         type: spotify
 *         playlists: 10
 *         tracks: 100
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
 *     AvailableStreaming:
 *       type: object
 *       required:
 *         - type
 *         - name
 *       properties:
 *         type:
 *           type: string
 *           description: Streaming type
 *         name:
 *           type: string
 *           description: Streaming name
 *       example:
 *        type: spotify
 *        name: Spotify
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
