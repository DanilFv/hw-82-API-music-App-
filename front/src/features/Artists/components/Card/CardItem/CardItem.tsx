import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Typography
} from '@mui/material';
import type {IArtists} from '../../../../../types';
import * as React from 'react';
import {BASE_URL} from '../../../../../constants.ts';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../../app/hooks.ts';
import {selectUser} from '../../../../users/store/usersSelectors.ts';
import {
    selectArtistDeleteLoading,
    selectArtistPublishLoading
} from '../../../store/artists/artistsSelector.ts';
import {
    deleteArtist,
    fetchArtists,
    toggleArtistPublished
} from '../../../store/artists/artistsThunks.ts'; // проверь путь!


interface Props {
    artist: IArtists;
}

const CardItem: React.FC<Props> = ({ artist }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const isDeleting = useAppSelector(selectArtistDeleteLoading);
    const isPublishing = useAppSelector(selectArtistPublishLoading);

    const isAdmin = user?.role === 'admin';

    const onDelete = async () => {
        if (window.confirm('Вы точно хотите удалить этого артиста?')) {
            await dispatch(deleteArtist(artist._id));
            await dispatch(fetchArtists());
        }
    };

    const onPublish = async () => {
        await dispatch(toggleArtistPublished(artist._id));
    };

    return (
        <Card sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            opacity: artist.isPublished ? 1 : 0.7
        }}>
            {!artist.isPublished && (
                <Chip
                    label="Неопубликовано"
                    color="warning"
                    sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
                />
            )}

            <CardActionArea component={NavLink} to={`/albums?artistId=${artist._id}`}>
                <CardMedia
                    component="img"
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

            {isAdmin && (
                <Box sx={{ p: 2, display: 'flex', gap: 1, borderTop: '1px solid #eee' }}>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={onDelete}
                        disabled={isDeleting || isPublishing}
                    >
                        Удалить
                    </Button>

                    {!artist.isPublished && (
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={onPublish}
                            disabled={isPublishing || isDeleting}
                        >
                            Опубликовать
                        </Button>
                    )}
                </Box>
            )}
        </Card>
    );
};

export default CardItem;