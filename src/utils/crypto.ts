import * as argon2 from 'argon2'
import jwt from 'koa-jwt'

import { serverConfig } from '../config'

export const hashPass = async (pass: string) => argon2.hash(pass)
export const verifyPass = async (pass: string, hash: string) => argon2.verify(hash, pass)

export const checkAuth = jwt({ secret: serverConfig.jwtSecret })
