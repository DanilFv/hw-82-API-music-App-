import express from 'express';
import Track from '../models/Track';
import {IArtist, ITrackWithoutId} from '../types';
import mongoose from 'mongoose';
import Album from '../models/Album';
import auth from '../middlewares/auth';
import permit from '../middlewares/permit';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    try {
        const albumId = req.query.album as string;
        const token = req.cookies.token;
        let isAdmin = false;

        if (token) {
            try {
                const decoded = jwt.verify(token, config.jwtSecret) as { _id: string };
                const user = await User.findOne({ _id: decoded._id, token });
                if (user && user.role === 'admin') isAdmin = true;
            } catch (e) {}
        }

        const criteria: any = {};
        if (!isAdmin) {
            criteria.isPublished = true;
        }

        if (albumId) {
            criteria.album = albumId;
        }

        const tracks = await Track.find(criteria).populate('album');
        res.send(tracks);
    } catch (e) {
        next(e);
    }
});

tracksRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const token = req.cookies.token;
        let isAdmin = false;

        if (token) {
            try {
                const decoded = jwt.verify(token, config.jwtSecret) as { _id: string };
                const user = await User.findOne({ _id: decoded._id, token });
                if (user && user.role === 'admin') isAdmin = true;
            } catch (e) {}
        }

        const album = await Album.findById(id).populate('artist');
        if (!album) return res.status(404).send('Album not found');

        if (!album.isPublished && !isAdmin) {
            return res.status(404).send('Album not found');
        }

        const criteria: any = { album: id };
        if (!isAdmin) {
            criteria.isPublished = true;
        }

        const tracks = await Track.find(criteria).sort({ track_number: 1 });

        res.send({
            artist: (album.artist as unknown as IArtist).name,
            album: album.title,
            tracks: tracks.map(track => ({
                _id: track._id,
                track_number: track.track_number,
                title: track.title,
                duration: track.duration,
                isPublished: track.isPublished
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
        if (!track) return res.status(404).send({ message: 'Track not found' });

        const updatedTrack = await Track.findByIdAndUpdate(
            id,
            { isPublished: !track.isPublished },
            { new: true }
        );
        res.send(updatedTrack);
    } catch (e) {
        next(e);
    }
});

export default tracksRouter;