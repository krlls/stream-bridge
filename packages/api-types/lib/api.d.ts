import { EStreamingType, Paginated, Response } from "./index";
export declare namespace Api {
  namespace User {
    const PREFIX = "/user";
    namespace Create {
      const URL = "/create";
      type Req = {
        login: string;
        name: string;
        pass: string;
      };
      type Resp = Response<{
        id: string;
        login: string;
        name: string;
      }>;
    }
    namespace GetProfile {
      const URL = "/profile";
      type Resp = Response<{
        id: string;
        login: string;
        name: string;
      }>;
    }
  }
  namespace Auth {
    const PREFIX = "/auth";
    namespace Login {
      const URL = "/login";
      type Req = {
        login: string;
        pass: string;
      };
      type Resp = Response<{
        token: string;
      }>;
    }
  }
  namespace Streaming {
    const PREFIX = "/streaming";
    enum EApiStreamingType {
      SPOTIFY = "spotify",
    }
    namespace Token {
      const PATCH = "/token";
      const STREAMING_TYPE = "/:type";
      const URL: string;
      type SuccessReq = {
        code: string;
        state: string;
      };
      type ErrorReq = {
        error: string;
        state: string;
      };
      type Req = SuccessReq | ErrorReq;
      type Resp = Response<{
        result: string;
      }>;
    }
    namespace Auth {
      const PATCH = "/auth";
      const STREAMING_TYPE = "/:type";
      const URL: string;
      type Resp = Response<{
        url: string;
      }>;
    }
    namespace List {
      const URL = "/list";
      type Streaming = {
        id: number;
        type: EStreamingType;
        playlists: number;
        tracks: number;
      };
      type Resp = Response<Paginated<Streaming>>;
    }
    namespace Delete {
      const PATCH = "/delete";
      const STREAMING_TYPE = "/:type";
      const URL: string;
      type Resp = Response<{
        result: string;
      }>;
    }
  }
  namespace Import {
    const PREFIX = "/import";
    namespace Playlists {
      const URL = "/playlists";
      type Req = {
        streamingType: Streaming.EApiStreamingType;
      };
      type Resp = Response<{
        exported: number;
        saved: number;
        deleted: number;
      }>;
    }
    namespace Tracks {
      const URL = "/tracks";
      type Req = {
        playlistId: number;
      };
      type Resp = Response<{
        exported: number;
        saved: number;
        deleted: number;
      }>;
    }
  }
  namespace Music {
    const PREFIX = "/music";
    namespace Playlists {
      const PATCH = "/playlists";
      const STREAMING_TYPE = "/:type";
      const URL: string;
      type Req = {
        offset: number;
        limit?: number;
      };
      type Playlist = {
        id: number;
        externalId: string;
        name: string;
        streamingType: EStreamingType;
      };
      type Resp = Response<Paginated<Playlist>>;
    }
    namespace Tracks {
      const PATCH = "/tracks";
      const STREAMING_TYPE = "/:type";
      const URL: string;
      type Req = {
        playlistId: number;
        offset: number;
        limit?: number;
      };
      type Track = {
        id: number;
        playlistId: number;
        externalId: string;
        name: string;
        artist: string;
        album: string;
      };
      type Resp = Response<Paginated<Track>>;
    }
  }
}
