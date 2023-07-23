import Router from 'koa-router'

import { appContainer } from '../inversify.config'
import { Api } from '../types/TApi'
import { TYPES } from '../types/const'
import { MusicController, musicValidators } from '../controllers/music'
import { checkAuth } from '../utils/crypto'

const router = new Router()

const musicController = appContainer.get<MusicController>(TYPES.MusicController)
router.get(Api.Music.Tracks.URL, checkAuth, musicValidators.getTracks, (ctx) =>
  musicController.getTracks(ctx, ctx.request.body),
)
router.get(Api.Music.Playlists.URL, checkAuth, musicValidators.getPlaylists, (ctx) =>
  musicController.getPlaylists(ctx, ctx.request.body),
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
