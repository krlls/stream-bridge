import { injectable } from 'inversify'
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

import { IUserService } from '../../modules/user/interfaces/IUserService'
import { UserDTO } from '../../modules/user/dtos/UserDTO'

@injectable()
export class FakeService implements IUserService {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  createUser(_user: any) {
    // eslint-disable-next-line no-console
    console.log('Test result')
    return new Promise((resolve) => resolve({ id: 1, login: 'fake login' }))
  }

  findUserById(_id: number) {
    return new Promise((resolve) => resolve(undefined)) as Promise<UserDTO | undefined>
  }
}

export const createFakeApp = (routes: { prefix: string, route: any }[]) => {
  const app = new Koa()
  const fakeRouter = new Router()
  app.use(bodyParser())

  routes.forEach((router) => {
    fakeRouter.use(router.prefix, router.route)
  })

  app.use(fakeRouter.routes())

  return app
}
