import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import TrackHistory from '../models/TrackHistory';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({ error: 'Token is missing' });
    }

    const user = await User.findOne({ token });

    console.log(user);

    if (!user) {
        return res.status(401).send({ error: 'Unauthorized' });
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

export default trackHistoryRouter;