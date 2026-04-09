import express from 'express';
import mongoose from 'mongoose';
import Artist from '../models/Artist';
import {imagesUpload} from '../multer';
import {IArtistDataWithoutId} from '../types';
import auth from '../middlewares/auth';
import permit from '../middlewares/permit';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
    try {
        const token = req.cookies.token;
        let isAdmin = false;

        if (token) {
            try {
                const decoded = jwt.verify(token, config.jwtSecret) as { _id: string };
                const user = await User.findOne({_id: decoded._id, token});
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

        const artists = await Artist.find(criteria);
        res.send(artists);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post('/', auth, imagesUpload.single('photo'), async (req, res, next) => {
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

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    const {id} = req.params;
    try {
        await Artist.findByIdAndDelete(id);
        res.send({message: 'Artist has been deleted successfully.'});
    } catch (e) {
        next(e);
    }
});

artistsRouter.patch('/:id', auth, permit('admin'), async (req, res, next) => {
    const {id} = req.params;
    try {
        const artist = await Artist.findById(id);
        if (!artist) {
            return res.status(404).send({message: 'Artist not found'});
        }

        const updatedArtist = await Artist.findByIdAndUpdate(
            id,
            {isPublished: !artist.isPublished},
            {new: true}
        );
        res.send(updatedArtist);
    } catch (e) {
        next(e);
    }
});

export default artistsRouter;