import { EStreamingType } from './common'

export interface ServerConfig {
  port: number,
  apiUrl: string,
  appUrl: string,
  silent: boolean,
  isProduction: boolean,
  expiresSessionIn: number | string,
  jwtSecret: string,
  jwtStreamingAuthSecret: string,
  jwtStreamingAuthExpires: number | string,

  spotifyClientId: string,
  spotifyClientSecret: string,

  swaggerPrefix: string,

  availableStreamings: AvailableStreaming[],
}

export type AvailableStreaming = {
  type: EStreamingType,
  name: string,
}
