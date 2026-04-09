import express from 'express';
import Track from '../models/Track';
import {IArtist, ITrackWithoutId} from '../types';
import mongoose from 'mongoose';
import Album from '../models/Album';
import auth from '../middlewares/auth';
import permit from '../middlewares/permit';

const tracksRouter = express.Router();

tracksRouter.get('/', auth, async (req, res, next) => {
    try {
        const albumId = req.query.album as string;
        let tracks;

        if (albumId) {
            tracks = await Track.find({ album: albumId }).populate('album');
        } else {
            tracks = await Track.find().populate('album');
        }

        res.send(tracks);
    } catch (e) {
        next(e);
    }
});

tracksRouter.get('/:id', auth, async (req, res, next) => {
    const { id } = req.params;

   try {
       const album = await Album.findById(id).populate('artist');

       if (!album) {
          return res.status(404).send('Album not found');
       }

       const tracks = await Track.find({ album: id as string }).sort({ track_number: 1 });

       res.send({
           artist: (album.artist as unknown as IArtist).name,
           album: album.title,
           tracks: tracks.map(track => ({
               _id: track._id,
               track_number: track.track_number,
               title: track.title,
               duration: track.duration,
           }))
       });
   } catch (e) {
       next(e);
   }
});

tracksRouter.post('/', auth, async (req, res, next) => {
   const newTrack: ITrackWithoutId = {
       title: req.body.title,
       album: req.body.album,
       duration: req.body.duration,
       track_number: req.body.track_number
   };
   try {
       const track = new Track(newTrack);
       await track.save();
       res.send(track);
   } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
       next(e);
   }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    const { id } = req.params;

    try {
        await Track.findByIdAndDelete(id);
        res.send({ message: 'Track has been deleted successfully.' });
    } catch (e) {
        next(e);
    }
});

tracksRouter.patch('/:id', auth, permit('admin'), async (req, res, next) => {
    const { id } = req.params;

    try {
        const track = await Track.findById(id);

        if (!track) {
          return res.status(404).send({ message: 'Album not found' });
        }

        track.isPublished = !track.isPublished;

        await track.save();
        res.send(track);
    } catch (e) {
        next(e);
    }
});

export default tracksRouter;