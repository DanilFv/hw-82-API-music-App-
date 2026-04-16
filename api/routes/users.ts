import express from 'express';
import {Error} from 'mongoose';
import User from '../models/User';
import auth, {RequestWithUser} from '../middlewares/auth';
import {OAuth2Client} from 'google-auth-library';
import config from '../config';
import * as crypto from 'node:crypto';
import {imagesUpload} from '../multer';

const usersRouter = express.Router();

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.file ? 'images/' + req.file.filename : 'images/no-avatar.png',
        });

        user.generateAuthToken();

        const saveUser = await user.save();

        res.cookie('token', saveUser.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.send({ message: 'User created successfully.', user });
    } catch (e) {
        if (e instanceof Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
});

usersRouter.post('/google', async (req, res, next) => {
    try {
        if (!req.body.credential) return res.status(400).send({ error: 'Credential is required' });
        const client = new OAuth2Client(config.clientID);

        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.clientID,
        });

        const payload = ticket.getPayload();

        if (!payload) return res.status(400).send({ error: 'Google login failed' });

        const email = payload.email;
        const id = payload.sub;
        const displayName = payload.name;
        const avatar = payload.picture ? payload.picture.replace('http://', 'https://') : 'images/no-avatar.png';

        if (!email) return res.status(400).send({ error: 'Not enough info from Google' });

        let user = await User.findOne({ googleID: id });

        if (!user) {
            user = new User({
                username: email,
                password: crypto.randomUUID(),
                googleID: id,
                displayName,
                avatar: avatar,
            });
        } else {
            if (avatar) {
                user.avatar = avatar;
            }
        }

        user.generateAuthToken();
        const userSave = await  user.save();
        res.cookie('token', userSave.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.send({ message: 'User saved successfully.', user });
    } catch (e) {
        next(e);
    }
});

usersRouter.post('/session', async (req, res, next) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'User not found'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Invalid password'});
    }

    user.generateAuthToken();
    const userSave = await user.save();
    res.cookie('token', userSave.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send({message: 'Session created', user});
});

usersRouter.delete('/sessions', auth, async (req, res, next) => {
    const {user} = req as RequestWithUser;
    user.token = '';
    await user.save();

    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict',
    });
    res.send({message: 'Logged out successfully'});
});

export default usersRouter;