import Router from 'koa-router'

import { userValidators, UserController } from '../controllers/user'
import { Api } from '../types/TApi'
import { controllerContainer } from '../inversify.config'
import { TYPES } from '../types/const'

const router = new Router()

const userController = controllerContainer.get<UserController>(TYPES.UserController)

router.post(Api.User.Create.URL, userValidators.createUser, (ctx) => userController.createUser(ctx, ctx.request.body))

export const userRouter = router
