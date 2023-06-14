import { ServerConfig } from '../types/TServer'
import { E_NODE_ENV } from '../types/common'
import { EXPIRES_SESSION_IN, JWT_SECRET, NODE_ENV } from './env'

export const serverConfig: ServerConfig = {
  port: 3000,
  silent: NODE_ENV === E_NODE_ENV.TEST,
  expiresSessionIn: EXPIRES_SESSION_IN || '3 days',
  jwtSecret: JWT_SECRET || 'test',
}
