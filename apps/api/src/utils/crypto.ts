import * as argon2 from 'argon2'
import jwt from 'koa-jwt'
import * as jsonwebtoken from 'jsonwebtoken'
import { inject, injectable } from 'inversify'
import { RouterContext } from 'koa-router'
import Koa from 'koa'

import { serverConfig } from '../config'
import { TYPES } from '../types/const'
import { IUserService } from '../modules/user/interfaces/IUserService'
import { isServiceError } from './errors'
import { respond401json } from './response'

export const ALGORITHM = 'HS256'

export const hashPass = async (pass: string) => argon2.hash(pass)
export const verifyPass = async (pass: string, hash: string) => argon2.verify(hash, pass)

const checkAuth = jwt({
  secret: serverConfig.jwtSecret,
  algorithms: [ALGORITHM],
})

export const checkStreamingToken = async (token: string) =>
  new Promise<boolean>((resolve) =>
    jsonwebtoken.verify(token, serverConfig.jwtStreamingAuthSecret, { algorithms: [ALGORITHM] }, (err) => {
      if (err) {
        return resolve(false)
      }

      return resolve(true)
    }),
  )

export const getDataFromToken = async <T extends Record<string, string | number>>(token: string) =>
  new Promise<T | undefined>((resolve) =>
    jsonwebtoken.verify(token, serverConfig.jwtStreamingAuthSecret, { algorithms: [ALGORITHM] }, (err, resp) => {
      if (err) {
        return resolve(undefined)
      }

      return resolve(resp as T)
    }),
  )

export const createSignedJwt = <T extends object>(payload: T) =>
  new Promise<string | null>((resolve) =>
    jsonwebtoken.sign(
      payload,
      serverConfig.jwtStreamingAuthSecret,
      {
        expiresIn: serverConfig.jwtStreamingAuthExpires,
        algorithm: ALGORITHM,
      },
      (error, encoded) => {
        if (error || !encoded) {
          return resolve(null)
        }

        return resolve(encoded)
      },
    ),
  )

@injectable()
export class AuthChecker {
  @inject(TYPES.UserService) private userService: IUserService

  createMiddleware() {
    return [checkAuth, this.checkUser]
  }

  private checkUser: Koa.Middleware = async (ctx, next) => {
    const user = await this.userService.findUserById(ctx.state.user?.userId)

    if (isServiceError(user)) {
      return respond401json(ctx as RouterContext, user)
    }

    return next()
  }
}
