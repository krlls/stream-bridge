import * as dotenv from 'dotenv'

import { E_NODE_ENV } from '../types/common'

import * as process from 'process'

dotenv.config()

export const NODE_ENV: E_NODE_ENV = (process.env.NODE_ENV as E_NODE_ENV) || E_NODE_ENV.DEV
export const EXPIRES_SESSION_IN = process.env.EXPIRES_SESSION_IN
export const JWT_SECRET = process.env.JWT_SECRET
