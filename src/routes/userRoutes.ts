import Router from 'koa-router'

import { userValidators, UserController } from '../controllers/user'
import { Api } from '../types/TApi'
import { controllerContainer } from '../inversify.config'
import { TYPES } from '../types/const'
import { checkAuth } from '../utils/crypto'

const router = new Router()

const userController = controllerContainer.get<UserController>(TYPES.UserController)

router.post(Api.User.Create.URL, userValidators.createUser, (ctx) => userController.createUser(ctx, ctx.request.body))
router.get(Api.User.GetProfile.URL, userValidators.getProfile, checkAuth, (ctx) => userController.profile(ctx))

export const userRouter = router

/**
 * @swagger
 * /user/create:
 *   post:
 *     tags:
 *      - User
 *     summary: Create new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - login:
 *              - name:
 *              - pass:
 *             properties:
 *              login:
 *                name: login
 *                type: string
 *              name:
 *                name: name
 *                type: string
 *              pass:
 *                name: pass
 *                type: string
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
 *                login:
 *                  type: string
 *                name:
 *                  type: string
 *
 *       500:
 *         description: Some server error
 *
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags:
 *      - User
 *     summary: Get user profile
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
 *                login:
 *                  type: string
 *                name:
 *                  type: string
 *
 *       500:
 *         description: Some server error
 *
 *       400:
 *         description: Validation error
 *       401:
 *         description: Needs valid auth token
 */
