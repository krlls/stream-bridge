export type ApiErrorResp = { error: string };
export type Response<T> = T | ApiErrorResp;
export type Paginated<T> = { items: T[] };

export enum EStreamingType {
  SPOTIFY = 'SPOTIFY',
  TIDAL = 'TIDAL',
}
