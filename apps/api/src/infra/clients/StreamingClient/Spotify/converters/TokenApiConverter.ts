import { Converter } from '../../../../../types/common'
import { ITokenResp } from '../interfaces/ISpotifyApi'
import { CreateStreamingTokenDTO } from '../../../../../modules/streaming/dtos/CreateStreamingTokenDTO'

export class TokenApiConverter implements Converter<ITokenResp, CreateStreamingTokenDTO> {
  from(from: ITokenResp): CreateStreamingTokenDTO {
    return new CreateStreamingTokenDTO({
      token: from.access_token,
      refreshToken: from.refresh_token,
      expiresIn: from.expires_in,
    })
  }
}
