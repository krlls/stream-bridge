import { AnySchema } from 'joi'
import { RouterContext } from 'koa-router'

import { respond400 } from './response'
import { ApiLogger } from './logger'
export const validatorFactory = (scheme: AnySchema) => async (ctx: RouterContext, next: () => Promise<any>) => {
  const validator = ctx.method.toUpperCase() === 'GET' ? scheme.validate(ctx.query) : scheme.validate(ctx.request.body)

  if (validator.error) {
    ApiLogger.error(ctx, 'Validation error')
    return respond400(ctx, {
      message: 'Validation error',
      details: validator?.error?.details,
    })
  }

  await next()
}
