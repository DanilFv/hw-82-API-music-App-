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


const AlbumTracks = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const isLoading = useAppSelector(selectTracksLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchTracks(id));
        }
    }, [dispatch]);

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && tracks === null && <Typography component='h5' variant="h5">Tracks not found</Typography> }
            {tracks !== null && <TrackCard albumData={tracks} />}
        </>
    );
};

export default AlbumTracks;