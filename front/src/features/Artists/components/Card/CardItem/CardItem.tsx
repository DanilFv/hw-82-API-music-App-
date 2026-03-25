import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';
import type {IArtists} from '../../../../../types';
import * as React from 'react';
import {BASE_URL} from '../../../../../constants.ts';

interface Props {
    artist: IArtists;
}

const CardItem: React.FC<Props> = ({ artist }) => {
    return (
        <Card sx={{ width: '100%' }} >
      <CardActionArea>
        <CardMedia
          component="img"
          width="100%"
          height="200px"
          image={artist.photo ? `${BASE_URL}/${artist.photo}` : undefined}
          alt={artist.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5" sx={{ fontWeight: 'bold' }}>
              {artist.name}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {artist.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    );
};

export default CardItem;