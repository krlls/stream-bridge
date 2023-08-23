export interface ITokenResp {
  access_token: string,
  expires: number,
}

export type IUpdateTokenResp = Omit<ITokenResp, 'refresh_token'>
