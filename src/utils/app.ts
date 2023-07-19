import { isUndefined } from 'lodash'
import { uid } from 'uid/single'

import { Uid } from '../types/common'

export const requiredEnv = <T extends string | number>(env?: T, name?: string) => {
  if (isUndefined(env)) {
    throw Error(`Required env ${name} not set`)
  }

  return env
}

export const genUid = (): Uid => uid(16)
