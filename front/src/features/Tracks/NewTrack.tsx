import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Container} from '@mui/material';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectArtists} from '../Artists/store/artists/artistsSelector.ts';
import {selectAlbums} from '../Artists/store/albums/albumsSelector.ts';
import {
    selectTrackCreateError,
    selectTrackCreateLoading
} from '../Artists/store/tracks/tracksSelector.ts';
import {fetchArtists} from '../Artists/store/artists/artistsThunks.ts';
import {fetchAlbums} from '../Artists/store/albums/albumsThunks.ts';
import type {ITrackMutation} from '../../types';
import {fetchAddTrack} from '../Artists/store/tracks/tracksThunks.ts';
import TracksForm from './components/TracksForm/TracksForm.tsx';
import {selectUser} from '../users/store/usersSelectors.ts';

const NewTrack = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    const artists = useAppSelector(selectArtists);
    const albums = useAppSelector(selectAlbums);
    const isCreating = useAppSelector(selectTrackCreateLoading);
    const error = useAppSelector(selectTrackCreateError);


    useEffect(() => {
        if (!user) {
            navigate('/');
        }
        dispatch(fetchArtists());
    }, [dispatch, user]);

    const handleArtistChange = (artistId: string) => {
        dispatch(fetchAlbums(artistId));
    };

    const onFormSubmit = async (trackData: ITrackMutation) => {
        try {
            await dispatch(fetchAddTrack(trackData)).unwrap();
            toast.success('Track successfully added');

            navigate('/');
        } catch (e) {
            console.error('Failed to create track', e);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <TracksForm
                    artists={artists}
                    albums={albums}
                    onArtistChange={handleArtistChange}
                    onSubmit={onFormSubmit}
                    loading={isCreating}
                    serverError={error}
                />
            </Box>
        </Container>
    );
};

export default NewTrack;