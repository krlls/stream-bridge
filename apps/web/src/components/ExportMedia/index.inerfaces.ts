import { FC, ReactNode } from 'react'
import { EStreamingType } from 'api-types'

import { TranslationDictionary } from '../../localization/types.ts'

export interface TProps {
  strategies: StrategyFactory[],
  streamingType: EStreamingType,
  playlistId?: number,
}

export interface IStrategy {
  name: string,
  steps: Step<any>[],
}

export interface TStepProps {
  children: (isNext: boolean) => ReactNode,
}

export interface Step<T> {
  index: number,
  cmp: FC<T>,
  title: string,
  desc?: string,
}

export type StrategyFactory = (t: (d: keyof TranslationDictionary) => string, d: TranslationDictionary) => IStrategy
