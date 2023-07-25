export type ApiErrorResp = { error: string };
export type Response<T> = T | ApiErrorResp;
export type Success<T> = Exclude<T, ApiErrorResp>;
export type Fail<T> = Exclude<ApiErrorResp, T>;

export type Paginated<T> = { items: T[] };

export enum EStreamingType {
  SPOTIFY = 'SPOTIFY',
  TIDAL = 'TIDAL',
}
