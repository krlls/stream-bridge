import { isUndefined } from 'lodash'
import { uid } from 'uid/single'

import { Uid } from '../types/common'
import { serverConfig } from '../config'

export const requiredEnv = <T extends string | number>(env?: T, name?: string) => {
  if (isUndefined(env)) {
    throw Error(`Required env ${name} not set`)
  }

  return env
}

export const genUid = (): Uid => uid(16)

export const printConsoleMessage = () => {
  if (serverConfig.isProduction) {
    // eslint-disable-next-line no-console
    console.log('Server is running at production')

    return
  }

  // eslint-disable-next-line no-console
  console.info(`✅  The server is running at ${serverConfig.apiUrl}`)
  // eslint-disable-next-line no-console
  console.info(`🪩 Swagger url ${serverConfig.apiUrl}${serverConfig.swaggerPrefix}`)
}
