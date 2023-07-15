import Koa from 'koa'
import { koaBody } from 'koa-body'

import { routers } from '../../routes'

const app = new Koa()

app.use(koaBody())

routers(app)

export const App = app
