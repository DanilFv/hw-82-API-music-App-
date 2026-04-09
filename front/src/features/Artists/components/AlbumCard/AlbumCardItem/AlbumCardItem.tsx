import {
    Box,
    Button,
    CardMedia,
    Chip,
    CircularProgress,
    Typography
} from '@mui/material';
import {BASE_URL} from '../../../../../constants.ts';
import type {IAlbums} from '../../../../../types';
import {useAppDispatch, useAppSelector} from '../../../../../app/hooks.ts';
import {selectUser} from '../../../../users/store/usersSelectors.ts';
import {useNavigate} from 'react-router-dom';
import {
    selectAlbumDeleteLoading,
    selectAlbumPublishLoading
} from '../../../store/albums/albumsSelector.ts';
import {
    deleteAlbum,
    fetchAlbums,
    toggleAlbumPublished
} from '../../../store/albums/albumsThunks.ts';

interface Props {
     album: IAlbums;
}

const AlbumCardItem: React.FC<Props> = ({ album }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);


    const isDeleting = useAppSelector(selectAlbumDeleteLoading);
    const isPublishing = useAppSelector(selectAlbumPublishLoading);

    const isAdmin = user?.role === 'admin';

    const onDelete = async () => {
        if (window.confirm('Вы действительно хотите удалить этот альбом?')) {
            await dispatch(deleteAlbum(album._id));
            navigate('/');

            await dispatch(fetchAlbums(album.artist._id));
        }
    };

    const onPublish = async () => {
        await dispatch(toggleAlbumPublished(album._id));
    };

    return (
        <Box sx={{ position: 'relative', mb: 4, boxShadow: 3, borderRadius: 2, overflow: 'hidden', bgcolor: '#fff' }}>
            {!album.isPublished && (
                <Chip
                    label="Неопубликовано"
                    color="warning"
                    sx={{ position: 'absolute', top: 15, right: 15, zIndex: 1, fontWeight: 'bold' }}
                />
            )}

            <CardMedia
                component="img"
                height="350"
                image={album.photo ? `${BASE_URL}/${album.photo}` : undefined}
                alt={album.title}
            />

            <Box sx={{ p: 3 }}>
                <Typography gutterBottom variant='h4' sx={{ fontWeight: 'bold', color: '#111' }}>
                    {album.title}
                </Typography>
                <Typography variant='body1' sx={{ color: 'text.secondary', mb: 2 }}>
                    Дата релиза: {album.release_date}
                </Typography>

                {isAdmin && (
                    <Box sx={{ display: 'flex', gap: 2, mt: 3, pt: 2, borderTop: '1px solid #eee' }}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={onDelete}
                            disabled={isDeleting}
                            loading={isDeleting}
                            loadingPosition='center'
                        >
                            Удалить
                        </Button>

                        {!album.isPublished && (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={onPublish}
                                disabled={isDeleting}
                                startIcon={isPublishing && <CircularProgress size={20} color="inherit" />}
                            >
                                Опубликовать
                            </Button>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default AlbumCardItem;