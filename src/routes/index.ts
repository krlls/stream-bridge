import Router from 'koa-router'
import { isEmpty } from 'lodash'

import { respond200plain } from '../utils/response'
import { ApiLogger, showNotEmpty } from '../utils/logger'
import { Api } from '../types/TApi'
import { authRouter } from './authRoutes'
import { userRouter } from './userRoutes'
import { streamingRouter } from './streamingRoutes'
import { importRouter } from './importRoutes'
import { swaggerMiddleware, swaggerRouter } from '../swagger/swagger'
import { serverConfig } from '../config'

const rootRouter = new Router()

export const routers = (app: any) => {
  rootRouter.use(async (ctx, next) => {
    ApiLogger.info(ctx, showNotEmpty(isEmpty(ctx.params), ctx.body))
    await next()
  })
  rootRouter.get('/', (ctx) => respond200plain(ctx, '🔥 Hello world!'))

  rootRouter.use(Api.User.PREFIX, userRouter.routes())
  rootRouter.use(Api.Auth.PREFIX, authRouter.routes())
  rootRouter.use(Api.Streaming.PREFIX, streamingRouter.routes())
  rootRouter.use(Api.Import.PREFIX, importRouter.routes())

  if (!serverConfig.isProduction) {
    app.use(swaggerRouter.routes(), swaggerRouter.allowedMethods())
    app.use(swaggerMiddleware)
  }

  app.use(rootRouter.routes())
}
