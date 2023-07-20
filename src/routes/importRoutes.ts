import Router from 'koa-router'

import { controllerContainer } from '../inversify.config'
import { Api } from '../types/TApi'
import { TYPES } from '../types/const'
import { importValidators } from '../controllers/import'
import { ImportController } from '../controllers/import'
import { checkAuth } from '../utils/crypto'

const router = new Router()

const importController = controllerContainer.get<ImportController>(TYPES.ImportController)

router.post(Api.Import.Playlists.URL, checkAuth, importValidators.importPlaylists, (ctx) =>
  importController.importPlaylists(ctx, ctx.request.body),
)
router.post(Api.Import.Tracks.URL, checkAuth, importValidators.importTracksByPlaylist, (ctx) =>
  importController.importTracksByPlaylist(ctx, ctx.request.body),
)

export const importRouter = router

/**
 * @swagger
 * /import/playlists:
 *   post:
 *     tags:
 *      - Import
 *     summary: Import all user playlists from streaming api
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - streamingType:
 *             properties:
 *              streamingType:
 *                name: streamingType
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
 *                saved:
 *                  type: number
 *
 *       500:
 *         description: Some server error
 *
 *       400:
 *         description: Validation error
 *       401:
 *         description: Needs valid auth token
 */

/**
 * @swagger
 * /import/tracks:
 *   post:
 *     tags:
 *      - Import
 *     summary: Import tracks by playlist id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - playlistId: string
 *             properties:
 *              playlistId:
 *                name: playlistId
 *                type: string
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
 *                saved:
 *                  type: number
 *
 *       500:
 *         description: Some server error
 *
 *       400:
 *         description: Validation error
 *       401:
 *         description: Needs valid auth token
 *
 */
