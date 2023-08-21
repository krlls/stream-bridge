import Router from 'koa-router'
import { Api } from 'api-types'

import { appContainer, authChecker } from '../inversify.config'
import { TYPES } from '../types/const'
import { MusicController, musicValidators } from '../controllers/music'

const router = new Router()

const musicController = () => appContainer.get<MusicController>(TYPES.MusicController)
router.get(Api.Music.Tracks.URL, ...authChecker.createMiddleware(), musicValidators.getTracks, (ctx) =>
  musicController().getTracks(ctx, ctx.request.query as any),
)
router.get(Api.Music.Playlists.URL, ...authChecker.createMiddleware(), musicValidators.getPlaylists, (ctx) =>
  musicController().getPlaylists(ctx, ctx.request.query as any),
)

router.get(Api.Music.Playlist.URL, ...authChecker.createMiddleware(), musicValidators.getPlaylist, (ctx) =>
  musicController().getPlaylist(ctx, ctx.request.query as any),
)

export const musicRouter = router

/**
 * @swagger
 * /music/playlists/{streamingType}:
 *   get:
 *     tags:
 *      - Music
 *     summary: Get user playlists with pagination
 *     description: Get a paginated list of user playlists based on the specified streaming type.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: streamingType
 *        in: path
 *        description: The type of streaming service for which the playlists will be retrieved.
 *        required: true
 *        schema:
 *          type: string
 *      - name: limit
 *        in: query
 *        description: The maximum number of playlists to return in each paginated response.
 *        schema:
 *          type: integer
 *          minimum: 1
 *          maximum: 50
 *          default: 50
 *      - name: offset
 *        in: query
 *        description: The number of playlists to skip before starting to return playlists in the response.
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 0
 *
 *     responses:
 *       200:
 *         description: Successful response with a paginated list of playlists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Playlist'
 *
 *       500:
 *         description: Some server error occurred.
 *
 *       400:
 *         description: Request validation error occurred or an error during the business logic execution.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationError'
 *                 - $ref: '#/components/schemas/ErrorResult'
 */

/**
 * @swagger
 * /music/playlist/{streamingType}:
 *   get:
 *     tags:
 *      - Music
 *     summary: Get playlist
 *     description: Get playlist by id.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: streamingType
 *        in: path
 *        description: The type of streaming service for which the playlist will be retrieved.
 *        required: true
 *        schema:
 *          type: string
 *      - name: id
 *        in: query
 *        description: Playlist id.
 *        schema:
 *          type: integer
 *
 *     responses:
 *       200:
 *         description: Successful response with playlist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *
 *       500:
 *         description: Some server error occurred.
 *
 *       400:
 *         description: Request validation error occurred or an error during the business logic execution.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationError'
 *                 - $ref: '#/components/schemas/ErrorResult'
 */

/**
 * @swagger
 * /music/tracks/{streamingType}:
 *   get:
 *     tags:
 *       - Music
 *     summary: Get user playlists with pagination
 *     description: Get a paginated list of music tracks based on the specified streaming type.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: streamingType
 *         in: path
 *         description: The type of streaming service for which the tracks will be retrieved.
 *         required: true
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: The maximum number of tracks to return in each paginated response.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 50
 *       - name: offset
 *         in: query
 *         description: The number of tracks to skip before starting to return tracks in the response.
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 0
 *
 *     responses:
 *       200:
 *         description: Successful response with a paginated list of tracks.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Track'
 *
 *       400:
 *         description: Request validation error occurred or an error during the business logic execution.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationError'
 *                 - $ref: '#/components/schemas/ErrorResult'
 */
