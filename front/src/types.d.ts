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

export interface ITracks {
    album: string,
    artist: string,
    tracks: [
        {
        track_number: number,
        title: string,
        duration: string,
    }
    ]
}
