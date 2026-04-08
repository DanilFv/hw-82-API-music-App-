import express from 'express';
import Album from '../models/Album';
import mongoose from 'mongoose';
import {imagesUpload} from '../multer';
import {IAlbumWithoutId} from '../types';
import auth from '../middlewares/auth';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    try {
        const artistId = req.query.artistId as string;

        let albums;

        if (artistId) {
            albums = await Album.find({ artist: artistId })
                .populate('artist')
                .sort({ release_date: -1 });
        } else {
            albums = await  Album.find()
                .populate('artist')
                .sort({ release_date: -1 });
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

albumsRouter.post('/', auth, imagesUpload.single('photo'), async (req, res, next) => {
    const newAlbum: IAlbumWithoutId = {
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

albumsRouter.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await Album.findByIdAndDelete(id);
        res.send({ message: 'Album deleted successfully.' });
    } catch (e) {
        next(e);
    }
});

albumsRouter.patch('/:id', auth, async (req, res, next) => {
    const { id } = req.params;

    try {
        const album = await Album.findById(id);

        if (!album) {
          return res.status(404).send({ message: 'Album not found' });
        }

        album.isPublished = !album.isPublished;

        await album.save();
        res.send(album);
    } catch (e) {
        next(e);
    }
});

export default albumsRouter;