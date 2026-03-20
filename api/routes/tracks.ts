import express from 'express';
import Track from '../models/Track';
import {ITrackWithoutId} from '../types';
import mongoose from 'mongoose';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
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

tracksRouter.post('/', async (req, res, next) => {
   const newTrack: ITrackWithoutId = {
       title: req.body.title,
       album: req.body.album,
       duration: req.body.duration,
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

export default tracksRouter;