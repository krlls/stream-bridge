import Router from 'koa-router'
import { Api } from 'api-types'

import { appContainer, authChecker } from '../inversify.config'
import { TYPES } from '../types/const'
import { importValidators } from '../controllers/import'
import { ImportController } from '../controllers/import'

const router = new Router()
const importController = appContainer.get<ImportController>(TYPES.ImportController)

router.post(Api.Import.Playlists.URL, ...authChecker.createMiddleware(), importValidators.importPlaylists, (ctx) =>
  importController.importPlaylists(ctx, ctx.request.body),
)
router.post(Api.Import.Tracks.URL, ...authChecker.createMiddleware(), importValidators.importTracksByPlaylist, (ctx) =>
  importController.importTracksByPlaylist(ctx, ctx.request.body),
)

export const importRouter = router

/**
 * @swagger
 * /import/playlists:
 *   post:
 *     tags:
 *      - Import
 *     summary: Import all user playlists from the streaming API
 *     description: Import all user playlists from the specified streaming service API (e.g., Spotify, Tidal).
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: streaming_type
 *         in: path
 *         description: The type of streaming service for which the playlists will be imported.
 *         required: true
 *         schema:
 *           type: string
 *           enum: [spotify, tidal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - streamingType
 *             properties:
 *              streamingType:
 *                type: string
 *                enum: [spotify, tidal]
 *     responses:
 *       200:
 *         description: Import result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                imported:
 *                  type: number
 *                  description: Number of playlists imported successfully.
 *                saved:
 *                  type: number
 *                  description: Number of playlists saved to the database.
 *
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *
 *       400:
 *         description: Request validation error or business logic execution error.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationError'
 *                 - $ref: '#/components/schemas/ErrorResult'
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 */

/**
 * @swagger
 * /import/tracks:
 *   post:
 *     tags:
 *      - Import
 *     summary: Import tracks by playlist ID
 *     description: Import tracks from the specified playlist ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: streaming_type
 *         in: path
 *         description: The type of streaming service for which the tracks will be imported.
 *         required: true
 *         schema:
 *           type: string
 *           enum: [spotify, tidal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - playlistId
 *             properties:
 *              playlistId:
 *                type: string
 *                description: The ID of the playlist from which to import tracks.
 *     responses:
 *       200:
 *         description: Import result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                imported:
 *                  type: number
 *                  description: Number of tracks imported successfully.
 *
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *
 *       400:
 *         description: Request validation error or business logic execution error.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationError'
 *                 - $ref: '#/components/schemas/ErrorResult'
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 */
