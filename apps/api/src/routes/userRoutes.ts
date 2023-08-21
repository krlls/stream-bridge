import Router from 'koa-router'
import { Api } from 'api-types'

import { userValidators, UserController } from '../controllers/user'
import { appContainer, authChecker } from '../inversify.config'
import { TYPES } from '../types/const'

const router = new Router()

const userController = () => appContainer.get<UserController>(TYPES.UserController)

router.post(Api.User.Create.URL, userValidators.createUser, (ctx) => userController().createUser(ctx, ctx.request.body))

router.get(Api.User.GetProfile.URL, userValidators.getProfile, ...authChecker.createMiddleware(), (ctx) =>
  userController().profile(ctx),
)

router.patch(Api.User.Update.URL, userValidators.updateUser, ...authChecker.createMiddleware(), (ctx) =>
  userController().updateUser(ctx, ctx.request.body),
)

export const userRouter = router

/**
 * @swagger
 * /user/create:
 *   post:
 *     tags:
 *      - User
 *     summary: Create new user
 *     description: Create a new user with the provided login, name, and password.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - login
 *              - name
 *              - pass
 *             properties:
 *              login:
 *                type: string
 *                description: User's login name.
 *              name:
 *                type: string
 *                description: User's name.
 *              pass:
 *                type: string
 *                description: User's password.
 *
 *     responses:
 *       200:
 *         description: Create user result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                id:
 *                  type: number
 *                  description: The unique identifier of the created user.
 *                login:
 *                  type: string
 *                  description: User's login name.
 *                name:
 *                  type: string
 *                  description: User's name.
 *
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *         content:
 *           application/json:
 *             schema:
 *              oneOf:
 *                 - $ref: '#/components/schemas/ErrorResult'
 *                 - $ref: '#/components/schemas/ValidationError'
 *
 *       400:
 *         description: Request validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */

/**
 * @swagger
 * /user/update:
 *   patch:
 *     tags:
 *      - User
 *     summary: Update user data
 *     description: Update user info.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              login:
 *                type: string
 *                description: User's login name.
 *              name:
 *                type: string
 *                description: User's name.
 *              pass:
 *                type: string
 *                description: User's password.
 *
 *     responses:
 *       200:
 *         description: Update result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                id:
 *                  type: number
 *                  description: The unique identifier of the user.
 *                login:
 *                  type: string
 *                  description: User's login.
 *                name:
 *                  type: string
 *                  description: User's name.
 *
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *         content:
 *           application/json:
 *             schema:
 *              oneOf:
 *                 - $ref: '#/components/schemas/ErrorResult'
 *                 - $ref: '#/components/schemas/ValidationError'
 *
 *       400:
 *         description: Request validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags:
 *      - User
 *     summary: Get user profile
 *     description: Get the user's profile information, including their unique identifier, login name, and name.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                id:
 *                  type: number
 *                  description: The unique identifier of the user.
 *                login:
 *                  type: string
 *                  description: User's login name.
 *                name:
 *                  type: string
 *                  description: User's name.
 *
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResult'
 *
 *       400:
 *         description: Request validation error.
 *         content:
 *           application/json:
 *             schema:
 *              oneOf:
 *                 - $ref: '#/components/schemas/ErrorResult'
 *                 - $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 */
