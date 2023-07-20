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
 * /auth/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Auth user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - login:
 *              - pass:
 *             properties:
 *              login:
 *                name: login
 *                type: string
 *              pass:
 *                name: pass
 *                type: string
 *
 *     responses:
 *       200:
 *         description: User successfully login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                token:
 *                  type: string
 *
 *       500:
 *         description: Some server error
 *
 *       400:
 *         description: Validation error
 *
 *       403:
 *         description: Login or pass incorrect
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ErrorResult'
 *
 */
