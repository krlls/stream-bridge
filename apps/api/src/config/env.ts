import * as dotenv from 'dotenv'

import { E_NODE_ENV } from '../types/common'
import { requiredEnv } from '../utils/app'

import * as process from 'process'

dotenv.config()

export const NODE_ENV: E_NODE_ENV = (process.env.NODE_ENV as E_NODE_ENV) || E_NODE_ENV.DEV
export const EXPIRES_SESSION_IN = process.env.EXPIRES_SESSION_IN
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_STREAMING_AUTH_SECRET = process.env.JWT_STREAMING_AUTH_SECRET
export const JWT_STREAMING_AUTH_EXPIRES = process.env.JWT_STREAMING_AUTH_EXPIRES
export const API_URL = process.env.API_URL
export const PORT: number = +(process.env.PORT || 0)

export const SPOTIFY_CLIENT_ID = requiredEnv<string>(process.env.SPOTIFY_CLIENT_ID, 'SPOTIFY_CLIENT_ID')
export const SPOTIFY_CLIENT_SECRET = requiredEnv<string>(process.env.SPOTIFY_CLIENT_SECRET, 'SPOTIFY_CLIENT_SECRET')
export const DEEZER_CLIENT_ID = requiredEnv<string>(process.env.DEEZER_CLIENT_ID, 'DEEZER_CLIENT_ID')
export const DEEZER_CLIENT_SECRET = requiredEnv<string>(process.env.DEEZER_CLIENT_SECRET, 'DEEZER_CLIENT_SECRET')
