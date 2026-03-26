export interface IArtistDataWithoutId {
    name: string;
    photo: string | null;
    description: string;
}

export interface IAlbumWithoutId {
  title: string;
  artist: Types.ObjectId;
  release_date: number;
  photo: string | null;
}

export interface ITrackWithoutId {
  title: string;
  album: Types.ObjectId;
  duration: string;
  track_number: req.body.track_number
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface IArtist {
  _id: string;
  name: string;
}