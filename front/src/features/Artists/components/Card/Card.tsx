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
                <Grid size={{ xs: 12, md: 6, lg: 6 }} key={artist._id}>
                    <CardItem artist={artist} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Card;