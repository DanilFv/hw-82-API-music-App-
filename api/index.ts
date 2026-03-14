import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const run = async () => {
    await mongoose.connect('mongodb://localhost/test');

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

    process.on('exit', () => {
       mongoose.disconnect();
    });
};

run().catch(err => console.error(err));