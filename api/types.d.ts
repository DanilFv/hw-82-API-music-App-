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
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
}