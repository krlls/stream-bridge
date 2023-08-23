import { AccessToken } from '@spotify/web-api-ts-sdk/src/types'

import { Converter } from '../../../../../types/common'
import { StreamingCredentialsDTO } from '../../../../../modules/music/dtos/StreamingCredentialsDTO'

export class CredentialsConverter implements Converter<StreamingCredentialsDTO, AccessToken> {
  from(from: StreamingCredentialsDTO): AccessToken {
    return {
      access_token: from.token,
      refresh_token: from.refreshToken,
      expires_in: from.expiresIn,
      expires: from.expires,
      token_type: 'Bearer',
    }
  }
}
