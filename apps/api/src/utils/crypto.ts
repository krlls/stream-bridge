import * as argon2 from 'argon2'
import jwt from 'koa-jwt'
import * as jsonwebtoken from 'jsonwebtoken'

import { serverConfig } from '../config'

export const ALGORITHM = 'HS256'

export const hashPass = async (pass: string) => argon2.hash(pass)
export const verifyPass = async (pass: string, hash: string) => argon2.verify(hash, pass)

export const checkAuth = jwt({
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
