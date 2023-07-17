import Router from 'koa-router'

import { controllerContainer } from '../inversify.config'
import { Api } from '../types/TApi'
import { TYPES } from '../types/const'
import { StreamingController } from '../controllers/streaming'
import { checkAuth } from '../utils/crypto'

const router = new Router()

const streamingController = controllerContainer.get<StreamingController>(TYPES.StreamingController)

router.get(Api.Streaming.Token.URL, (ctx) => streamingController.token(ctx, ctx.request.query as any))
router.get(Api.Streaming.Auth.URL, checkAuth, (ctx) => streamingController.getAuthUrl(ctx))

export const streamingRouter = router
