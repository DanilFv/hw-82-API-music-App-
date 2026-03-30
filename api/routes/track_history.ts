import express from 'express';
import mongoose from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import auth, {RequestWithUser} from '../middlewares/auth';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
     if (!req.body.track) {
            return res.status(400).send({
                error: 'You must specify a track.'
            });
     }

    try {
        const trackHistory = new TrackHistory({
            user: user._id,
            track: req.body.track,
        });
        await trackHistory.save();
        res.send(trackHistory);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

trackHistoryRouter.get('/', auth, async (req, res, next) => {
   const user = (req as RequestWithUser).user;
   try {
       const trackHistory = await TrackHistory.find({ user: user._id })
           .populate({
               path: 'track',
               select: 'title',
               populate: {
                   path: 'album',
                   model: 'Album',
                   populate: {
                       path: 'artist',
                       select: 'name',
                       model: 'Artist'
                   }
               },
           })
           .sort({ datetime: -1 });
       res.send(trackHistory);
   } catch (e) {
       next(e);
   }
});

export default trackHistoryRouter;