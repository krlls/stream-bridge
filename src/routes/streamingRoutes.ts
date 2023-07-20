import Router from 'koa-router'

import { appContainer } from '../inversify.config'
import { Api } from '../types/TApi'
import { TYPES } from '../types/const'
import { StreamingController, streamingValidators } from '../controllers/streaming'
import { checkAuth } from '../utils/crypto'

const router = new Router()

const streamingController = appContainer.get<StreamingController>(TYPES.StreamingController)

router.get(Api.Streaming.Token.URL, streamingValidators.setToken, (ctx) =>
  streamingController.token(ctx, ctx.request.query as any),
)
router.get(Api.Streaming.Auth.URL, checkAuth, (ctx) => streamingController.getAuthUrl(ctx))

export const streamingRouter = router

/**
 * @swagger
 * /streaming/auth/{streamingType}:
 *   get:
 *     tags:
 *      - Streaming
 *     summary: Create streaming auth url for user
 *     responses:
 *       200:
 *         description: Auth url
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                url:
 *                  type: string
 *
 *       500:
 *         description: Some server error
 *
 *       400:
 *         description: Validation error
 *
 */

/**
 * @swagger
 * /streaming/token/{streamingType}:
 *   get:
 *     tags:
 *      - Streaming
 *     summary: Setup token data by streaming after redirect from streaming auth service
 *     parameters:
 *      - name: code
 *        type: string
 *        required: true
 *        in: query
 *        description: Auth session code
 *      - name: state
 *        type: string
 *        required: true
 *        in: query
 *        description: Streaming auth session token width userId
 *      - name: error
 *        type: string
 *        in: query
 *        description: Auth error message
 *
 *     responses:
 *       200:
 *         description: Result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                  type: string
 *
 *       500:
 *         description: Some server error
 *
 *       400:
 *         description: Validation error
 *
 */
