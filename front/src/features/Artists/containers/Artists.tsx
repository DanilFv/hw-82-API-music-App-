import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {
    selectArtists,
    selectIsLoading
} from '../store/artists/artistsSelector.ts';
import {fetchArtists} from '../store/artists/artistsThunks.ts';
import Card from '../components/Card/Card.tsx';
import Spinner from '../../../components/UI/Spinner/Spinner.tsx';
import {Box, Typography} from '@mui/material';

const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const isLoading = useAppSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '25px' }}>
            {isLoading && <Spinner />}
            {!isLoading && artists.length === 0 && <Typography component='h5' variant="h5">Artists not found</Typography>}
            {!isLoading && artists.length > 0 && <Card artists={artists} />}
        </Box>
    );
};

export default Artists;