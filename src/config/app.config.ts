import { ServerConfig } from '../types/TServer'
import { E_NODE_ENV } from '../types/common'
import { EXPIRES_SESSION_IN, JWT_SECRET, NODE_ENV, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from './env'

export const serverConfig: ServerConfig = {
  port: 3000,
  silent: NODE_ENV === E_NODE_ENV.TEST,
  expiresSessionIn: EXPIRES_SESSION_IN || '3 days',
  jwtSecret: JWT_SECRET || 'test',

  spotifyClientId: SPOTIFY_CLIENT_ID,
  spotifyClientSecret: SPOTIFY_CLIENT_SECRET,
}
