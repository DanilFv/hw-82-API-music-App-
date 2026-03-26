import type {IAlbums} from '../../../../types';
import AlbumCardItem from './AlbumCardItem/AlbumCardItem.tsx';
import {Grid} from '@mui/material';
import {NavLink} from 'react-router-dom';

interface Props {
    albums: IAlbums[];
}

const AlbumCard: React.FC<Props> = ({ albums }) => {
    return (
        <Grid container spacing={2}>
            {albums.map((album) => (
                <Grid
                    component={NavLink}
                    to={`/albums/${album._id}/tracks`}
                    size={{ xs: 12, md: 6, lg: 4 }}
                    sx={{
                        textDecoration: 'none',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'background.paper',
                        transition: 'all 0.3s ease-in-out',
                        cursor: 'pointer',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                        }
                    }}
                    key={album._id}
                >
                    <AlbumCardItem key={album._id} album={album} />
                </Grid>
            ))}
        </Grid>
    );
};

export default AlbumCard;