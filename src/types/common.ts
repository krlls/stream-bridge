export interface Converter<F, T> {
  from(from: F): T,
  to(to: T): F,
}

export enum E_NODE_ENV {
  TEST = 'test',
  DEV = 'development',
  PROD = 'production',
}

export type toCreate<T extends { id: number }> = Omit<T, 'id'> & Partial<Pick<T, 'id'>>
