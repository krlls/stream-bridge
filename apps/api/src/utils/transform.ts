import { Api } from 'api-types'
import { RouterContext } from 'koa-router'
import { get } from 'lodash'

import { EStreamingType } from '../types/common'

export const getUserId = (ctx: RouterContext): number => get(ctx, 'state.user.userId', -1)
export const convertStreamingName = (name: string): EStreamingType | undefined =>
  ({
    [Api.Streaming.EApiStreamingType.SPOTIFY]: EStreamingType.SPOTIFY,
    [Api.Streaming.EApiStreamingType.DEEZER]: EStreamingType.DEEZER,
  })[name]

export const calcExpires = (expiresIn: number) => Date.now() + expiresIn * 1000
