import { isUndefined } from 'lodash'

export const requiredEnv = <T extends string | number>(env?: T, name?: string) => {
  if (isUndefined(env)) {
    throw Error(`Required env ${name} not set`)
  }

  return env
}
