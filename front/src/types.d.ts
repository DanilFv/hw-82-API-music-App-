export interface IArtists {
    _id: string,
    name: string,
    photo: string | null,
    description: string,
}

export interface IAlbums {
    _id: string,
  title: string;
  artist: {
      _id: string,
      name: string,
      photo: string | null,
      description: string,
  }
  release_date: number;
  photo: string | null;
}