import mongoose from 'mongoose';

import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

const run = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/spotify');

  await mongoose.connection.dropCollection('artists').catch(() => {});
  await mongoose.connection.dropCollection('albums').catch(() => {});
  await mongoose.connection.dropCollection('tracks').catch(() => {});

  const [eminem, fifty] = await Artist.create(
    {
      name: 'Eminem',
      photo: 'images/eminem.jpg',
      description: 'Legendary rapper',
    },
    {
      name: '50 Cent',
      photo: 'images/50cent.jpg',
      description: 'G-Unit rapper',
    }
  );

  const [
    eminemAlbum1,
    eminemAlbum2,
    eminemAlbum3,
    fiftyAlbum1,
    fiftyAlbum2,
    fiftyAlbum3,
  ] = await Album.create(
    {
      title: 'The Eminem Show',
      artist: eminem!._id,
      release_date: 2002,
      photo: 'images/TheEminemShow.jpg',
    },
    {
      title: 'Recovery',
      artist: eminem!._id,
      release_date: 2010,
      photo: 'images/Recovery.jpg',
    },
    {
      title: 'Music to Be Murdered By',
      artist: eminem!._id,
      release_date: 2020,
      photo: 'images/MusicToBMurderedBy.jpg',
    },
    {
      title: 'Get Rich or Die Tryin',
      artist: fifty!._id,
      release_date: 2003,
      photo: 'images/GetRichOrDieTryin.jpg',
    },
    {
      title: 'The Massacre',
      artist: fifty!._id,
      release_date: 2005,
      photo: 'images/TheMassacre.jpg',
    },
    {
      title: 'Curtis',
      artist: fifty!._id,
      release_date: 2007,
      photo: 'images/Curtis.jpg',
    }
  );

  await Track.create(
    { title: 'Without Me', album: eminemAlbum1!._id, duration: '4:50', track_number: 1 },
    { title: 'Cleanin Out My Closet', album: eminemAlbum1!._id, duration: '4:57', track_number: 2 },
    { title: 'Sing for the Moment', album: eminemAlbum1!._id, duration: '5:40', track_number: 3 },
    { title: 'Superman', album: eminemAlbum1!._id, duration: '5:50', track_number: 4 },
    { title: 'Till I Collapse', album: eminemAlbum1!._id, duration: '4:57', track_number: 5 },

    { title: 'Not Afraid', album: eminemAlbum2!._id, duration: '4:08', track_number: 1 },
    { title: 'Love The Way You Lie', album: eminemAlbum2!._id, duration: '4:23', track_number: 2 },
    { title: 'Cold Wind Blows', album: eminemAlbum2!._id, duration: '5:04', track_number: 3 },
    { title: 'No Love', album: eminemAlbum2!._id, duration: '5:00', track_number: 4 },
    { title: 'Space Bound', album: eminemAlbum2!._id, duration: '4:38', track_number: 5 },

    { title: 'Godzilla', album: eminemAlbum3!._id, duration: '3:30', track_number: 1 },
    { title: 'Darkness', album: eminemAlbum3!._id, duration: '5:37', track_number: 2 },
    { title: 'You Gon’ Learn', album: eminemAlbum3!._id, duration: '3:54', track_number: 3 },
    { title: 'Unaccommodating', album: eminemAlbum3!._id, duration: '3:33', track_number: 4 },
    { title: 'Leaving Heaven', album: eminemAlbum3!._id, duration: '4:25', track_number: 5 },

    { title: 'In Da Club', album: fiftyAlbum1!._id, duration: '3:13', track_number: 1 },
    { title: '21 Questions', album: fiftyAlbum1!._id, duration: '3:44', track_number: 2 },
    { title: 'P.I.M.P.', album: fiftyAlbum1!._id, duration: '4:09', track_number: 3 },
    { title: 'Many Men (Wish Death)', album: fiftyAlbum1!._id, duration: '4:44', track_number: 4 },
    { title: 'If I Can\'t', album: fiftyAlbum1!._id, duration: '3:16', track_number: 5 },

    { title: 'Candy Shop', album: fiftyAlbum2!._id, duration: '3:29', track_number: 1 },
    { title: 'Just a Lil Bit', album: fiftyAlbum2!._id, duration: '3:57', track_number: 2 },
    { title: 'Piggy Bank', album: fiftyAlbum2!._id, duration: '4:15', track_number: 3 },
    { title: 'Outta Control', album: fiftyAlbum2!._id, duration: '3:21', track_number: 4 },
    { title: 'I\'m Supposed to Die Tonight', album: fiftyAlbum2!._id, duration: '3:51', track_number: 5 },

    { title: 'Ayo Technology', album: fiftyAlbum3!._id, duration: '4:08', track_number: 1 },
    { title: 'I Get Money', album: fiftyAlbum3!._id, duration: '3:44', track_number: 2 },
    { title: 'My Gun Go Off', album: fiftyAlbum3!._id, duration: '3:12', track_number: 3 },
    { title: 'Man Down', album: fiftyAlbum3!._id, duration: '2:49', track_number: 4 },
    { title: 'I\'ll Still Kill', album: fiftyAlbum3!._id, duration: '3:43', track_number: 5 }
  );

  await mongoose.connection.close();
};

run().catch(console.error);