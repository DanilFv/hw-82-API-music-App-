import type {IAlbums} from '../../../../types';
import AlbumCardItem from './AlbumCardItem/AlbumCardItem.tsx';
import {Grid} from '@mui/material';

interface Props {
    albums: IAlbums[];
}

const AlbumCard: React.FC<Props> = ({ albums }) => {
    return (
        <Grid container spacing={2}>
            {albums.map((album) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={album._id}>
                    <AlbumCardItem key={album._id} album={album} />
                </Grid>
            ))}
        </Grid>
    );
};

export default AlbumCard;