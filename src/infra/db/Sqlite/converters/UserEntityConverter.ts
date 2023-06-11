import { injectable } from 'inversify'

import { Converter } from '../../../../types/common'
import { UserEntity } from '../entities/UserEntity'
import { IUser } from '../../../../modules/user/entities/IUser'

@injectable()
export class UserEntityConverter implements Converter<UserEntity, IUser> {
  from(from: UserEntity): IUser {
    return {
      id: from.id,
      login: from.login,
    }
  }

  to(to: IUser): UserEntity {
    const user = new UserEntity()

    user.id = to.id
    user.login = to.login

    return user
  }
}
