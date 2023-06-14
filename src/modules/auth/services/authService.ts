import { inject, injectable } from 'inversify'
// import jwt from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

import { IAuthService } from '../interfaces/IAuthService'
import { LoginDTO } from '../dtos/LoginDTO'
import { TYPES } from '../../../types/const'
import { IUserRepository } from '../../user/interfaces/IUserRepository'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors } from '../../../types/common'
import { LoginSuccessDTO } from '../dtos/loginSuccessDTO'
import { verifyPass } from '../../../utils/crypto'
import { Jwt } from '../entities/Jwt'
import { serverConfig } from '../../../config'

@injectable()
export class AuthService implements IAuthService {
  @inject(TYPES.UserRepository) private UserRepository: IUserRepository
  async login(loginData: LoginDTO) {
    const user = await this.UserRepository.findUserByLogin(loginData.login)

    if (!user) {
      return new ErrorDTO(Errors.AUTH_INCORRECT)
    }

    const passIsCorrect = await verifyPass(loginData.pass, user.hash)

    if (!passIsCorrect) {
      return new ErrorDTO(Errors.AUTH_INCORRECT)
    }

    const data: Jwt = {
      userId: user.id,
    }

    try {
      const token = jwt.sign(data, serverConfig.jwtSecret, { expiresIn: serverConfig.expiresSessionIn })

      return new LoginSuccessDTO(token)
    } catch (_e) {
      return new ErrorDTO(Errors.AUTH_INCORRECT)
    }
  }
}
