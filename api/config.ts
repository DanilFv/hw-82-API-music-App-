import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    jwtSecret: process.env.JWT_SECRET || 'secret',
    clientID: (process.env.CLIENT_ID || '...').trim(),
    clientSecret: (process.env.CLIENT_SECRET || '...').trim(),
};

export default config;