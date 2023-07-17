import { ServerConfig } from '../types/TServer'
import { E_NODE_ENV } from '../types/common'
import {
  API_URL,
  EXPIRES_SESSION_IN,
  JWT_SECRET,
  NODE_ENV,
  PORT,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from './env'

export const serverConfig: ServerConfig = {
  port: PORT || 3000,
  apiUrl: API_URL ? `${API_URL}:${PORT || 3000}` : `http://localhost:${PORT || 3000}`,
  silent: NODE_ENV === E_NODE_ENV.TEST,
  expiresSessionIn: EXPIRES_SESSION_IN || '3 days',
  jwtSecret: JWT_SECRET || 'test',

  spotifyClientId: SPOTIFY_CLIENT_ID,
  spotifyClientSecret: SPOTIFY_CLIENT_SECRET,
}
