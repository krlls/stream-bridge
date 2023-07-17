import { serverConfig } from '../config'

export const createPatch = (...args: string[]) => args.join('')

export const apiLink = (...args: string[]) => createPatch(serverConfig.apiUrl, ...args)
