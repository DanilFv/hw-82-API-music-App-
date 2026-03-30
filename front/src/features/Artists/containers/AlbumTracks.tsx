import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {
    selectTracks,
    selectTracksLoading
} from '../store/tracks/tracksSelector.ts';
import {useEffect} from 'react';
import {fetchTracks} from '../store/tracks/tracksThunks.ts';
import TrackCard from '../components/TrackCard/TrackCard.tsx';
import Spinner from '../../../components/UI/Spinner/Spinner.tsx';
import {Typography} from '@mui/material';
import {selectUser} from '../../users/store/usersSelectors.ts';
import {
    fetchTrackToHistory
} from '../../trackHistory/store/trackHistoryThunks.ts';
import {
    selectPlayingTrack
} from '../../trackHistory/store/trackHistorySelectors.ts';


const AlbumTracks = () => {
    const user = useAppSelector(selectUser);
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const isLoading = useAppSelector(selectTracksLoading);
    const playingTrack = useAppSelector(selectPlayingTrack);

    useEffect(() => {
        if (id) {
            dispatch(fetchTracks(id));
        }
    }, [dispatch]);

    const onTrackToPlay = async (id: string) => {
      await dispatch(fetchTrackToHistory(id));
    };

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && tracks === null && <Typography component='h5' variant="h5">Tracks not found</Typography> }
            {tracks !== null && <TrackCard albumData={tracks} onTrackToPlay={onTrackToPlay} playing={playingTrack} />}
            {!isLoading && !user &&
                <Typography
                    component='p'
                    variant='h5'
                    sx={{ mt: 2 }}
                >
                  To view albums tracks and artist details, please <strong>register</strong> or <strong>sign in</strong> to your account.
                </Typography>}
        </>
    );
};

export default AlbumTracks;