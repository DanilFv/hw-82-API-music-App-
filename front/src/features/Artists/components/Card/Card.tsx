import type {IArtists} from '../../../../types';
import CardItem from './CardItem/CardItem.tsx';
import {Grid} from '@mui/material';

interface Props {
    artists: IArtists[];
}

const Card: React.FC<Props> = ({ artists }) => {
    return (
        <Grid container spacing={2}>
            {artists.map(artist => (
                <Grid size={{ xs: 12, md: 6, lg: 6 }}
                      sx={{
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
                      key={artist._id}
                >
                    <CardItem artist={artist} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Card;