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

export interface ITracks {
    album: string;
    artist: string;
    tracks: [
        {
        track_number: number;
        title: string;
        duration: string;
    }
    ]
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
