const createPatch = (...args: string[]) => args.join('')

export const apiPatch = (base: string) => createPatch.bind(null, base)
