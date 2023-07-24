import Router from 'koa-router'

import { appContainer } from '../inversify.config'
import { Api } from '../types/TApi'
import { TYPES } from '../types/const'
import { AuthController, authValidators } from '../controllers/auth'

const router = new Router()

const authController = appContainer.get<AuthController>(TYPES.AuthController)
router.post(Api.Auth.Login.URL, authValidators.authUser, (ctx) => authController.login(ctx, ctx.request.body))

export const authRouter = router

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Auth user
 *     description: Authenticate a user with their login credentials (login and password).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - login
 *              - pass
 *             properties:
 *              login:
 *                type: string
 *                description: User's login name.
 *              pass:
 *                type: string
 *                description: User's password.
 *
 *     responses:
 *       200:
 *         description: User successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                token:
 *                  type: string
 *                  description: JWT token for user authentication.
 *
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *
 *       400:
 *         description: Request validation error.
 *         content:
 *           application/json:
 *            schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorResult'
 *                 - $ref: '#/components/schemas/ValidationError'
 *
 *       403:
 *         description: Login or pass incorrect. Authentication failed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResult'
 */
