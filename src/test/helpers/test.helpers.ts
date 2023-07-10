import { createPatch } from '../../utils/links'
import { Api } from '../../types/TApi'

export const userUrl: (...args: string[]) => string = createPatch.bind(null, Api.User.PREFIX)
export const authUrl: (...args: string[]) => string = createPatch.bind(null, Api.Auth.PREFIX)
export const testUserData = {
  login: 'Ksmi',
  name: 'Kirill',
  pass: '123',
}

export const testPlaylistData = (userId: number) => ({
  userId,
  name: 'Test playlist',
  externalId: '65FD4G65SF',
})
