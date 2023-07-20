import Router from 'koa-router'
import swaggerJSDoc from 'swagger-jsdoc'
import { koaSwagger } from 'koa2-swagger-ui'

const options = {
  definition: {
    failOnErrors: true,
    openapi: '3.0.0',
    info: {
      title: 'Stream bridge',
      version: '0.0.1',
    },
  },
  apis: ['src/routes/*.ts'],
}

export const router = new Router()
router.get('/api', async function (ctx) {
  ctx.set('Content-Type', 'application/json')
  ctx.body = swaggerJSDoc(options)
})

export const swaggerMiddleware = koaSwagger({
  routePrefix: '/swagger',
  swaggerOptions: {
    url: '/api',
  },
})

export const swaggerRouter = router
