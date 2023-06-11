export interface Converter<F, T> {
  from(from: F): T,
  to(to: T): F,
}

export enum E_NODE_ENV {
  TEST = 'test',
  DEV = 'development',
  PROD = 'production',
}
