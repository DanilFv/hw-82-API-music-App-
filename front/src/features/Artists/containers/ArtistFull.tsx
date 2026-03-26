import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {
    selectAlbums,
    selectAlbumsLoading
} from '../store/albums/albumsSelector.ts';
import {useEffect} from 'react';
import {fetchAlbums} from '../store/albums/albumsThunks.ts';
import AlbumCard from '../components/AlbumCard/AlbumCard.tsx';
import {Box, Typography} from '@mui/material';
import Spinner from '../../../components/UI/Spinner/Spinner.tsx';

const ArtistFull = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('artistId');
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const isLoading = useAppSelector(selectAlbumsLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchAlbums(id));
        }
    },[dispatch])

    return (
        <Box>
            {albums.length > 0 && <Typography component='h4' variant='h4' sx={{ mt: '15px', mb: '40px', fontWeight: 'bold' }}>{albums[0].artist.name}</Typography> }
            {isLoading && <Spinner />}
            {!isLoading && albums.length === 0 && <Typography component='h5' variant="h5">Albums not found</Typography>}
            {!isLoading && albums.length > 0 && <AlbumCard albums={albums} />}
        </Box>
    );
};

export default ArtistFull;