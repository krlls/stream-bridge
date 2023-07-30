import { API_URL } from '../const.ts'

const createPatch = (...args: string[]) => args.join('')

export const apiPatch = (base: string) => createPatch.bind(null, base)

export const withBaseUrl = (withBaseUrl: string) => API_URL + withBaseUrl
