"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
var Api;
(function (Api) {
    let User;
    (function (User) {
        User.PREFIX = '/user';
        let Create;
        (function (Create) {
            Create.URL = '/create';
        })(Create = User.Create || (User.Create = {}));
        let GetProfile;
        (function (GetProfile) {
            GetProfile.URL = '/profile';
        })(GetProfile = User.GetProfile || (User.GetProfile = {}));
    })(User = Api.User || (Api.User = {}));
    let Auth;
    (function (Auth) {
        Auth.PREFIX = '/auth';
        let Login;
        (function (Login) {
            Login.URL = '/login';
        })(Login = Auth.Login || (Auth.Login = {}));
    })(Auth = Api.Auth || (Api.Auth = {}));
    let Streaming;
    (function (Streaming) {
        Streaming.PREFIX = '/streaming';
        let EApiStreamingType;
        (function (EApiStreamingType) {
            EApiStreamingType["SPOTIFY"] = "spotify";
        })(EApiStreamingType = Streaming.EApiStreamingType || (Streaming.EApiStreamingType = {}));
        let Token;
        (function (Token) {
            Token.PATCH = '/token';
            Token.STREAMING_TYPE = '/:type';
            Token.URL = Token.PATCH + Token.STREAMING_TYPE;
        })(Token = Streaming.Token || (Streaming.Token = {}));
        let Auth;
        (function (Auth) {
            Auth.PATCH = '/auth';
            Auth.STREAMING_TYPE = '/:type';
            Auth.URL = Auth.PATCH + Auth.STREAMING_TYPE;
        })(Auth = Streaming.Auth || (Streaming.Auth = {}));
        let List;
        (function (List) {
            List.URL = '/list';
        })(List = Streaming.List || (Streaming.List = {}));
        let Delete;
        (function (Delete) {
            Delete.PATCH = '/delete';
            Delete.STREAMING_TYPE = '/:type';
            Delete.URL = Delete.PATCH + Delete.STREAMING_TYPE;
        })(Delete = Streaming.Delete || (Streaming.Delete = {}));
    })(Streaming = Api.Streaming || (Api.Streaming = {}));
    let Import;
    (function (Import) {
        Import.PREFIX = '/import';
        let Playlists;
        (function (Playlists) {
            Playlists.URL = '/playlists';
        })(Playlists = Import.Playlists || (Import.Playlists = {}));
        let Tracks;
        (function (Tracks) {
            Tracks.URL = '/tracks';
        })(Tracks = Import.Tracks || (Import.Tracks = {}));
    })(Import = Api.Import || (Api.Import = {}));
    let Music;
    (function (Music) {
        Music.PREFIX = '/music';
        let Playlists;
        (function (Playlists) {
            Playlists.PATCH = '/playlists';
            Playlists.STREAMING_TYPE = '/:type';
            Playlists.URL = Playlists.PATCH + Playlists.STREAMING_TYPE;
        })(Playlists = Music.Playlists || (Music.Playlists = {}));
        let Tracks;
        (function (Tracks) {
            Tracks.PATCH = '/tracks';
            Tracks.STREAMING_TYPE = '/:type';
            Tracks.URL = Tracks.PATCH + Tracks.STREAMING_TYPE;
        })(Tracks = Music.Tracks || (Music.Tracks = {}));
    })(Music = Api.Music || (Api.Music = {}));
})(Api || (exports.Api = Api = {}));
//# sourceMappingURL=api.js.map