import { injectable } from 'inversify'

import { Converter } from '../../../../types/common'
import { UserEntity } from '../entities/UserEntity'
import { User } from '../../../../modules/user/entities/User'

@injectable()
export class UserEntityConverter implements Converter<UserEntity, User> {
  from(from: UserEntity): User {
    return {
      id: from.id,
      login: from.login,
      name: from.name,
      hash: from.hash,
      playlists: from.playlists,
    }
  }

  to(to: User): UserEntity {
    const user = new UserEntity()

    user.id = to.id
    user.login = to.login
    user.name = to.name
    user.hash = to.hash

    return user
  }
}
