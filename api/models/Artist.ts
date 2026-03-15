import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async (value: string) => {
                const artist = await Artist.findOne({ name: value });
                if (artist) return false;
                return true;
            },
            message: 'Artist name is unique',
        }
    },
    photo: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;