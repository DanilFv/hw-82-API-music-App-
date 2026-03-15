import express from 'express';
import Album from '../models/Album';
import mongoose from 'mongoose';
import {imagesUpload} from '../multer';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    try {
        const artistId = req.query.artistId as string;

        let albums;

        if (artistId) {
            albums = await Album.find({ artist: artistId }).populate('artist');
        } else {
            albums = await  Album.find().populate('artist');
        }

        res.send(albums);
    } catch (e) {
        next(e);
    }
});

albumsRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const album = await Album.findById(id).populate('artist');
        res.send(album);
    } catch (e) {
        next(e);
    }
});

albumsRouter.post('/', imagesUpload.single('photo'), async (req, res, next) => {
    const newAlbum = {
        title: req.body.title,
        artist: req.body.artist,
        release_date: req.body.release_date,
        photo: req.file ? 'images/' + req.file.filename : null,
    }
    try {
        const album = new Album(newAlbum);
        await album.save();
        res.send(album);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e);
    }
});

export default albumsRouter;