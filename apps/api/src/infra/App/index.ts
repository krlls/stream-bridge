import Koa from 'koa'
import cors from '@koa/cors'
import { koaBody } from 'koa-body'

import { routers } from '../../routes'
import { serverConfig } from '../../config'

const app = new Koa()

app.use(
  cors({
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: serverConfig.isProduction ? serverConfig.appUrl : '*',
  }),
)

app.use(koaBody())

routers(app)

export const App = app
