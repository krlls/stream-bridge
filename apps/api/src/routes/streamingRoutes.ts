import Router from 'koa-router'
import { Api } from 'api-types'

import { appContainer, authChecker } from '../inversify.config'
import { TYPES } from '../types/const'
import { StreamingController, streamingValidators } from '../controllers/streaming'

const router = new Router()

const streamingController = appContainer.get<StreamingController>(TYPES.StreamingController)

router.get(Api.Streaming.Token.URL, streamingValidators.setToken, (ctx) =>
  streamingController.token(ctx, ctx.request.query as any),
)
router.get(Api.Streaming.Auth.URL, ...authChecker.createMiddleware(), (ctx) => streamingController.getAuthUrl(ctx))
router.get(Api.Streaming.List.URL, ...authChecker.createMiddleware(), (ctx) => streamingController.list(ctx))
router.get(Api.Streaming.Available.URL, ...authChecker.createMiddleware(), (ctx) =>
  streamingController.getAvailableStreamings(ctx),
)
router.delete(Api.Streaming.Delete.URL, ...authChecker.createMiddleware(), (ctx) => streamingController.delete(ctx))

export const streamingRouter = router

/**
 * @swagger
 * /streaming/auth/{streamingType}:
 *   get:
 *     tags:
 *      - Streaming
 *     summary: Create streaming auth URL for user
 *     description: Get the authentication URL for the specified streaming service (e.g., Spotify) to authorize the user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: streamingType
 *         in: path
 *         description: The type of streaming service for which the authentication URL will be generated.
 *         required: true
 *         schema:
 *           type: string
 *           enum: [spotify]  # Add more streaming services here if needed
 *     responses:
 *       200:
 *         description: Auth URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                url:
 *                  type: string
 *                  description: The authentication URL that the user needs to visit to grant permission to the application.
 *
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *
 *       400:
 *         description: Request validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResult'
 */

/**
 * @swagger
 * /streaming/token/{streamingType}:
 *   get:
 *     tags:
 *      - Streaming
 *     summary: Setup token data by streaming after redirect from streaming auth service
 *     description: Handle the redirect from the streaming authentication service after the user grants permission.
 *     parameters:
 *      - name: code
 *        type: string
 *        in: query
 *        description: Authorization code received from the streaming service after the user grants permission.
 *      - name: state
 *        type: string
 *        in: query
 *        description:  State token, containing userId or session data.
 *      - name: error
 *        type: string
 *        in: query
 *        description: This parameter should be omitted in successful redirects. It's used for error scenarios.
 *
 *     responses:
 *       200:
 *         description: Result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StreamingTokenResponse'
 *
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *
 *       400:
 *         description: Request validation error or error during token setup.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorResult'
 *                 - $ref: '#/components/schemas/ValidationError'
 */

/**
 * @swagger
 * /streaming/list:
 *   get:
 *     tags:
 *      - Streaming
 *     summary: List all user streamings
 *     description: Get all user connected streamings.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Result
 *         content:
 *           application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Streaming'
 *
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *
 *       400:
 *         description: Request validation error or error during token setup.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorResult'
 *                 - $ref: '#/components/schemas/ValidationError'
 */

/**
 * @swagger
 * /streaming/available:
 *   get:
 *     tags:
 *      - Streaming
 *     summary: List all available streamings
 *     description: Get all available streamings.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Result
 *         content:
 *           application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AvailableStreaming'
 *
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *
 *       400:
 *         description: Request validation error or error during token setup.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorResult'
 *                 - $ref: '#/components/schemas/ValidationError'
 */

/**
 * @swagger
 * /delete/{streaming_type}:
 *   delete:
 *     tags:
 *      - Streaming
 *     summary: Delete streaming by ID
 *     description: Delete streaming by id and delete all linked tracks and playlists
 *     security:
 *       - BearerAuth: []

 *     responses:
 *       200:
 *         description: Import result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                deleted:
 *                  type: integer
 *                  description: Remove result
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
 *                 - $ref: '#/components/schemas/ErrorResult'
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 */
