import Router from 'koa-router'
import { Api } from 'api-types'

import { appContainer, authChecker } from '../inversify.config'
import { TYPES } from '../types/const'
import { ExportController } from '../controllers/export'
import { exportValidators } from '../controllers/export/exportValidators'

const router = new Router()
const controller = () => appContainer.get<ExportController>(TYPES.ExportController)

router.post(Api.Export.Tracks.URL, ...authChecker.createMiddleware(), exportValidators.exportTracks, (ctx) =>
  controller().exportTracks(ctx, ctx.request.body),
)

router.post(Api.Export.Playlists.URL, ...authChecker.createMiddleware(), exportValidators.exportPlaylists, (ctx) =>
  controller().exportPlaylists(ctx, ctx.request.body),
)

export const exportRouter = router

/**
 * @swagger
 * /export/tracks:
 *   post:
 *     tags:
 *      - Export
 *     summary: Export tracks to playlist
 *     description: Export tracks to playlist by track ids and playlist id
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - trackIds
 *              - playlistId
 *             properties:
 *              trackIds:
 *                type: array
 *                items:
 *                  type: number
 *              playlistId:
 *                type: number
 *     responses:
 *       200:
 *         description: Import result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                exported:
 *                  type: number
 *                  description: Number of tracks exported successfully.
 *                total:
 *                  type: number
 *                  description: Number of total tracks.
 *                notFoundIds:
 *                  description: Number of not found tracks in target streaming.
 *                  type: array
 *                  items:
 *                    type: number
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
 * /export/playlists:
 *   post:
 *     tags:
 *      - Export
 *     summary: Export playlists to streaming
 *     description: Export one or many playlists and tracks
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - playlistIds
 *              - target
 *             properties:
 *              target:
 *                type: string
 *                enum: [spotify, deezer]
 *              playlistIds:
 *                type: array
 *                items:
 *                  type: number

 *     responses:
 *       200:
 *         description: Import result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                exported:
 *                  type: number
 *                  description: Number of playlists exported successfully.
 *                total:
 *                  type: number
 *                  description: Number of total playlists.
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
