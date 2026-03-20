import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import artistsRouter from './routes/artists';
import albumsRouter from './routes/albums';
import tracksRouter from './routes/tracks';
import usersRouter from './routes/users';
import trackHistoryRouter from './routes/track_history';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', trackHistoryRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/spotify');

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

    process.on('exit', () => {
       mongoose.disconnect();
    });
};

run().catch(err => console.error(err));