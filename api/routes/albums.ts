import express from 'express';
import Album from '../models/Album';
import mongoose from 'mongoose';
import {imagesUpload} from '../multer';
import {IAlbumWithoutId} from '../types';
import auth from '../middlewares/auth';
import permit from '../middlewares/permit';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    try {
        const artistId = req.query.artistId as string;
        const token= req.cookies.token;
        let isAdmin = false;

        if (token) {
            try {
                const decoded = jwt.verify(token, config.jwtSecret) as { _id: string };
                const user = await User.findOne({ _id: decoded._id, token });
                if (user && user.role === 'admin') {
                    isAdmin = true;
                }
            } catch (e) {

            }
        }

        const criteria: any = {};

        if (!isAdmin) {
            criteria.isPublished = true;
        }

        if (artistId) {
            criteria.artist = artistId;
        }

        const albums = await Album.find(criteria)
            .populate('artist')
            .sort({ release_date: -1 });

        res.send(albums);
    } catch (e) {
        next(e);
    }
});

albumsRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const album = await Album.findById(id).populate('artist');

        if (album && !album.isPublished) {
            const token = req.cookies.token;
            let isAdmin = false;
            if (token) {
                const decoded = jwt.verify(token, config.jwtSecret) as { _id: string };
                const user = await User.findOne({ _id: decoded._id, token });
                if (user?.role === 'admin') isAdmin = true;
            }

            if (!isAdmin) return res.status(404).send({ message: 'Album not found' });
        }

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

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    const { id } = req.params;
    try {
        await Album.findByIdAndDelete(id);
        res.send({ message: 'Album deleted successfully.' });
    } catch (e) {
        next(e);
    }
});

albumsRouter.patch('/:id', auth, permit('admin'), async (req, res, next) => {
    const { id } = req.params;

    try {
        const album = await Album.findById(id);

        if (!album) {
            return res.status(404).send({ message: 'Album not found' });
        }

        const updatedAlbum = await Album.findByIdAndUpdate(
            id,
            { isPublished: !album.isPublished },
            { new: true }
        );

        res.send(updatedAlbum);
    } catch (e) {
        next(e);
    }
});

export default albumsRouter;