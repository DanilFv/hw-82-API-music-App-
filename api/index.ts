import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import artistsRouter from './routes/artists';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/artists', artistsRouter);

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