import { AvailableStreaming, ServerConfig } from '../types/TServer'
import { E_NODE_ENV, EStreamingType } from '../types/common'
import {
  API_URL,
  DEEZER_CLIENT_ID,
  DEEZER_CLIENT_SECRET,
  EXPIRES_SESSION_IN,
  JWT_SECRET,
  JWT_STREAMING_AUTH_EXPIRES,
  JWT_STREAMING_AUTH_SECRET,
  NODE_ENV,
  PORT,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from './env'

export const availableStreamings: AvailableStreaming[] = [
  { type: EStreamingType.SPOTIFY, name: 'Spotify' },
  { type: EStreamingType.DEEZER, name: 'Deezer' },
]

export const serverConfig: ServerConfig = {
  port: PORT || 3000,
  appUrl: 'http://localhost:5173',
  apiUrl: API_URL ? `${API_URL}:${PORT || 3000}` : `http://localhost:${PORT || 3000}`,
  silent: NODE_ENV === E_NODE_ENV.TEST,
  isProduction: NODE_ENV === E_NODE_ENV.PROD,
  expiresSessionIn: EXPIRES_SESSION_IN || '3 days',
  jwtSecret: JWT_SECRET || 'test',
  jwtStreamingAuthSecret: JWT_STREAMING_AUTH_SECRET || 'test',
  jwtStreamingAuthExpires: JWT_STREAMING_AUTH_EXPIRES || '3 min',

  spotifyClientId: SPOTIFY_CLIENT_ID,
  spotifyClientSecret: SPOTIFY_CLIENT_SECRET,
  deezerClientId: DEEZER_CLIENT_ID,
  deezerClientSecret: DEEZER_CLIENT_SECRET,

  swaggerPrefix: '/swagger',

  availableStreamings: availableStreamings,
}
