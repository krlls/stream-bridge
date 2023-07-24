export interface ITokenResp {
  access_token: string,
  token_type: string,
  expires_in: number,
  refresh_token: string,
  scope: string,
}

export type IUpdateTokenResp = Omit<ITokenResp, 'refresh_token'>