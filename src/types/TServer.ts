export type ServerConfig = {
  port: number,
  silent: boolean,
  expiresSessionIn: number | string,
  jwtSecret: string,

  spotifyClientId: string,
  spotifyClientSecret: string,
}
