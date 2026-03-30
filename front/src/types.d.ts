export interface IArtists {
    _id: string;
    name: string;
    photo: string | null;
    description: string;
}

export interface IAlbums {
    _id: string;
  title: string;
  artist: {
      _id: string;
      name: string;
      photo: string | null;
      description: string;
  }
  release_date: number;
  photo: string | null;
}

export interface ITrackItem {
    _id: string;
    track_number: number;
    title: string;
    duration: string;
}

export interface ITracksResponse {
    artist: string;
    album: string;
    tracks: ITrackItem[];
}

export interface IUser {
    _id: string;
    username: string;
    token: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    },
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface TrackHistoryMutation {
    track: string;
}

export interface ITrackHistory {
    _id: string;
    user: string;
    track: string;
    datetime: string;
}

export interface ITrackHistoryResponse {
    _id: string;
    user: string;
    track: {
        _id: string;
        title: string;
        album: {
            _id: string;
            title: string;
            artist: {
                _id: string;
                name: string;
            },
            release_date: number;
            photo: string | null;
        }
    };
    datetime: string;
}
