import Router from 'koa-router'
import swaggerJSDoc from 'swagger-jsdoc'
import { koaSwagger } from 'koa2-swagger-ui'

const options: swaggerJSDoc.Options = {
  definition: {
    failOnErrors: true,
    openapi: '3.0.0',
    info: {
      title: 'Stream Bridge',
      version: '0.0.1',
    },
    // schemes: ['src/types/TApi.ts']
  },
  apis: ['src/routes/*.ts', 'src/types/TApi.ts'],
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
