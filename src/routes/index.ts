import Router from 'koa-router'
import { isEmpty } from 'lodash'

import { userRouter } from './userRoutes'
import { respond200plain } from '../utils/response'
import { ApiLogger, showNotEmpty } from '../utils/logger'
import { Api } from '../types/TApi'

const rootRouter = new Router()

export const routers = (app: any) => {
  rootRouter.use(async (ctx, next) => {
    ApiLogger.info(ctx, showNotEmpty(isEmpty(ctx.params), ctx.body))
    await next()
  })
  rootRouter.get('/', (ctx) => respond200plain(ctx, '🔥 Hello world!'))
  rootRouter.use(Api.User.PREFIX, userRouter.routes())

  app.use(rootRouter.routes())
}
