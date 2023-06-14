import Router from 'koa-router'

import { controllerContainer } from '../inversify.config'
import { Api } from '../types/TApi'
import { TYPES } from '../types/const'
import { AuthController, authValidators } from '../controllers/auth'

const router = new Router()

const authController = controllerContainer.get<AuthController>(TYPES.AuthController)

router.post(Api.Auth.Login.URL, authValidators.authUser, (ctx) => authController.login(ctx, ctx.request.body))

export const authRouter = router
