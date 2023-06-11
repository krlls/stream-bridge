import { ServerConfig } from '../types/TServer'
import { E_NODE_ENV } from '../types/common'
import { NODE_ENV } from './env'

export const serverConfig: ServerConfig = {
  port: 3000,
  silent: NODE_ENV === E_NODE_ENV.TEST,
}
