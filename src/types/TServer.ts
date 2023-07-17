export interface ServerConfig {
  port: number,
  apiUrl: string,
  silent: boolean,
  expiresSessionIn: number | string,
  jwtSecret: string,

  spotifyClientId: string,
  spotifyClientSecret: string,
}
