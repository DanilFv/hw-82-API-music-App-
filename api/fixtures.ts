import mongoose from 'mongoose';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from './models/User';

const run = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/spotify');

  const collections = ['artists', 'albums', 'tracks', 'users'];
  for (const collection of collections) {
    await mongoose.connection.dropCollection(collection).catch(() => {});
  }

  const admin = new User({
    username: 'admin',
    password: '123',
    role: 'admin',
    token: ''
  });
  admin.generateAuthToken();
  await admin.save();

   const user = new User({
    username: 'Jone',
    password: '123',
    role: 'user',
    token: ''
  });
  user.generateAuthToken();
  await user.save();

  const [eminem, fifty] = await Artist.create(
    {
      name: 'Eminem',
      photo: 'images/eminem.jpg',
      description: 'Legendary rapper',
      isPublished: true,
    },
    {
      name: '50 Cent',
      photo: 'images/50cent.jpg',
      description: 'G-Unit rapper',
      isPublished: true,
    }
  );

  const [undergroundArtist] = await Artist.create([
    {
      name: 'Unpublished Rapper',
      photo: 'images/unpublished.png',
      description: 'Hidden talent',
      isPublished: false,
    }
  ]);

  const [eminemAlbum1, eminemAlbum2, eminemAlbum3, fiftyAlbum1, fiftyAlbum2, fiftyAlbum3] = await Album.create(
    { title: 'The Eminem Show', artist: eminem!._id, release_date: 2002, photo: 'images/TheEminemShow.jpg', isPublished: true },
    { title: 'Recovery', artist: eminem!._id, release_date: 2010, photo: 'images/Recovery.jpg', isPublished: true },
    { title: 'Music to Be Murdered By', artist: eminem!._id, release_date: 2020, photo: 'images/MusicToBMurderedBy.jpg', isPublished: true },
    { title: 'Get Rich or Die Tryin', artist: fifty!._id, release_date: 2003, photo: 'images/GetRichOrDieTryin.jpg', isPublished: true },
    { title: 'The Massacre', artist: fifty!._id, release_date: 2005, photo: 'images/TheMassacre.jpg', isPublished: true },
    { title: 'Curtis', artist: fifty!._id, release_date: 2007, photo: 'images/Curtis.jpg', isPublished: true }
  );

  const [unpublishedAlbum] = await Album.create([
    {
      title: 'Secret Album',
      artist: undergroundArtist!._id,
      release_date: 2024,
      isPublished: false,
      photo: 'images/secret.png',
    }
  ]);

  await Track.create(
    { title: 'Without Me', album: eminemAlbum1!._id, duration: '4:50', track_number: 1, isPublished: true },
    { title: 'Cleanin Out My Closet', album: eminemAlbum1!._id, duration: '4:57', track_number: 2, isPublished: true },
    { title: 'Sing for the Moment', album: eminemAlbum1!._id, duration: '5:40', track_number: 3, isPublished: true },

    { title: 'Not Afraid', album: eminemAlbum2!._id, duration: '4:08', track_number: 1, isPublished: true },
    { title: 'Love The Way You Lie', album: eminemAlbum2!._id, duration: '4:23', track_number: 2, isPublished: true },

    { title: 'Godzilla', album: eminemAlbum3!._id, duration: '3:30', track_number: 1, isPublished: true },

    { title: 'In Da Club', album: fiftyAlbum1!._id, duration: '3:13', track_number: 1, isPublished: true },
    { title: 'Candy Shop', album: fiftyAlbum2!._id, duration: '3:29', track_number: 1, isPublished: true },
    { title: 'Ayo Technology', album: fiftyAlbum3!._id, duration: '4:08', track_number: 1, isPublished: true }
  );

  await Track.create(
    { title: 'Hidden Track 1', album: unpublishedAlbum!._id, duration: '3:00', track_number: 1, isPublished: false },
    { title: 'Hidden Track 2', album: unpublishedAlbum!._id, duration: '2:30', track_number: 2, isPublished: false },
    { title: 'Hidden Track 3', album: unpublishedAlbum!._id, duration: '4:15', track_number: 3, isPublished: false }
  );

  console.log('Fixtures loaded successfully!');
  await mongoose.connection.close();
};

run().catch(console.error);