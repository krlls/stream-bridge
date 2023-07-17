export interface ServerConfig {
  port: number,
  apiUrl: string,
  silent: boolean,
  expiresSessionIn: number | string,
  jwtSecret: string,
  jwtStreamingAuthSecret: string,
  jwtStreamingAuthExpires: number | string,

  spotifyClientId: string,
  spotifyClientSecret: string,
}
