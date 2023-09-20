import { FC } from 'react'

import { TranslationDictionary } from '../../localization/types.ts'

export interface TProps {
  strategies: StrategyFactory[],
}

export interface IStrategy {
  name: string,
  steps: Step<any>[],
}

export interface Step<T> {
  index: number,
  cmp: FC<T>,
  title: string,
  desc?: string,
}

export type StrategyFactory = (t: (d: keyof TranslationDictionary) => string, d: TranslationDictionary) => IStrategy
