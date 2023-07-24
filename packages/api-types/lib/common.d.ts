export type ApiErrorResp = {
  error: string;
};
export type Response<T> = T | ApiErrorResp;
export type Paginated<T> = {
  items: T[];
};
export declare enum EStreamingType {
  SPOTIFY = "SPOTIFY",
  TIDAL = "TIDAL",
}
