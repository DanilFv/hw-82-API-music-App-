import mongoose, {Schema} from 'mongoose';
import Album from './Album';

const TrackSchema = new mongoose.Schema({
   title: {
       type: String,
       required: true,
       validate: {
           validator: async function(value: string){
               const trackExists = await Album.findOne({ title: value, album: this.album });
               if (trackExists) return false;
               return true;
           },
           message: 'This track already exists in this album!'
       }
   },
    album: {
       type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    duration: {
       type: String,
        default: null,
    }
});