import express from 'express';
import mongoose from 'mongoose';
import Artist from '../models/Artist';
import {imagesUpload} from '../multer';
import {IArtistDataWithoutId} from '../types';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
   try {
        const artists = await Artist.find();
        res.send(artists);
   } catch (e) {
       next(e);
   }
});

artistsRouter.post('/', imagesUpload.single('photo') , async (req, res, next) => {
    const artistData: IArtistDataWithoutId = {
        name: req.body.name,
        photo: req.file ? 'images/' + req.file.filename : null,
        description: req.body.description,
    };

    try {
        const artist = new Artist(artistData);
        await artist.save();
        res.send(artist);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
           res.status(400).send(error);
           return;
       }
        next(error);
    }
});

export default artistsRouter;

