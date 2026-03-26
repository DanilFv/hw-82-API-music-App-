import {CardMedia, Typography} from '@mui/material';
import {BASE_URL} from '../../../../../constants.ts';
import type {IAlbums} from '../../../../../types';

interface Props {
     album: IAlbums;
}

const AlbumCardItem: React.FC<Props> = ({ album }) => {
    return (
        <>
            <CardMedia
                component="img"
                width="100%"
                height='auto'
                image={album.photo ? `${BASE_URL}/${album.photo}` : undefined}
                alt={album.artist.name}
            />

            <Typography gutterBottom component='h6' variant='h5' sx={{ mt: '15px' }}>{album.title}</Typography>
            <Typography component='p' variant='body1' sx={{ color: 'text.secondary' }}>{album.release_date}</Typography>
        </>
    );
};

export default AlbumCardItem;