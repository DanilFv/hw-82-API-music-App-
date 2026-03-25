import mongoose, {Schema} from 'mongoose';
import Artist from './Artist';

const AlbumSchema = new mongoose.Schema({
   title: {
       type: String,
       required: true,
       validate: {
           validator: async (value: string) => {
               const album = await Album.findOne({ title: value });
               if (album) return false;
               return true;
           },
           message: 'Album title is unique',
       },
       trim: true,
   },
    artist: {
       type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
           validator: async (artistId: mongoose.Schema.Types.ObjectId) => {
               const artist = await Artist.findById(artistId);
               if (!artist) return false;
               return true;
           },
            message: 'Artist does not exist',
        }
    },
    release_date: {
       type: Number,
        required: true,
        min: [1900, 'Release year cannot be earlier than 1900'],
        max: [new Date().getFullYear(), 'Release year cannot be in the future'],
    },
    photo: {
       type: String,
        default: null,
    }
});


const Album = mongoose.model('Album', AlbumSchema);
export default Album;