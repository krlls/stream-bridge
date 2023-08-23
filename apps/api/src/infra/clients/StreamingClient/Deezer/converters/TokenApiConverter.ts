import { Converter } from '../../../../../types/common'
import { ITokenResp } from '../interfaces/DeezerApi'
import { CreateStreamingTokenDTO } from '../../../../../modules/streaming/dtos/CreateStreamingTokenDTO'
import { calcExpires } from '../../../../../utils/transform'

export class TokenApiConverter implements Converter<ITokenResp, CreateStreamingTokenDTO> {
  from(from: ITokenResp): CreateStreamingTokenDTO {
    return new CreateStreamingTokenDTO({
      token: from.access_token,
      expiresIn: from.expires,
      expires: calcExpires(from.expires),
    })
  }
}
