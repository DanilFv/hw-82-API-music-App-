import mongoose from 'mongoose';

const TrackHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    track: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    datetime: {
        type: Date,
        default: Date.now,
    }
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
export default TrackHistory;