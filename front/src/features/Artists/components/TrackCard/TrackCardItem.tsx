import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';
import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import type {ITrackItem} from '../../../../types';
import PauseIcon from '@mui/icons-material/Pause';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks.ts';
import {selectUser} from '../../../users/store/usersSelectors.ts';
import {
    selectTrackDeleteLoading,
    selectTrackPublishLoading
} from '../../store/tracks/tracksSelector.ts';
import {
    deleteTrack,
    fetchTracks,
    toggleTrackPublished
} from '../../store/tracks/tracksThunks.ts';
import {useParams} from 'react-router-dom';

interface Props {
    track: ITrackItem;
    isLast: boolean;
    clickOnTrackToPlay: (value: string) => void;
    playing: string | null;
}

const TrackCardItem: React.FC<Props> = ({ track, isLast, clickOnTrackToPlay, playing }) => {
    const { id: albumId } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const isCurrentPlaying = playing === track._id;

    const isAdmin = user?.role === 'admin';
    const isDeleting = useAppSelector(selectTrackDeleteLoading);
    const isPublishing = useAppSelector(selectTrackPublishLoading);

    const onDelete = async () => {
        if (window.confirm(`Удалить трек "${track.title}"?`)) {
            await dispatch(deleteTrack(track._id));
            if (albumId) {
                await dispatch(fetchTracks(albumId));
            }
        }
    };

    const onPublish = async () => {
        await dispatch(toggleTrackPublished(track._id));
    };

    return (
        <>
            <ListItem
                sx={{
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'background 0.2s',
                    bgcolor: isCurrentPlaying ? 'action.selected' : 'transparent',
                    '&:hover': { bgcolor: 'action.hover' }
                }}
            >
                <Typography variant="body1" sx={{ minWidth: '40px', color: 'text.secondary', fontWeight: 500 }}>
                    {track.track_number}
                </Typography>

                <IconButton
                    type='button'
                    color={isCurrentPlaying ? 'primary' : 'default'}
                    sx={{ mr: 1 }}
                    onClick={() => clickOnTrackToPlay(track._id)}
                >
                    {isCurrentPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>

                <ListItemText
                    primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {track.title}
                            {!track.isPublished && (
                                <Chip label="Unpublished" size="small" color="warning" variant="outlined" sx={{ height: '20px', fontSize: '10px' }} />
                            )}
                        </Box>
                    }
                />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace', mr: 2 }}>
                        {track.duration}
                    </Typography>

                    {isAdmin && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {!track.isPublished && (
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="success"
                                    onClick={onPublish}
                                    disabled={isDeleting}
                                    sx={{ minWidth: '100px' }}
                                >
                                    {isPublishing ? <CircularProgress size={16} color="inherit" /> : 'Publish'}
                                </Button>
                            )}
                            <Button
                                size="small"
                                variant="contained"
                                color="error"
                                onClick={onDelete}
                                disabled={isDeleting}
                                loading={isDeleting}
                                loadingPosition='center'
                            >   Delete
                            </Button>
                        </Box>
                    )}
                </Box>
            </ListItem>
            {!isLast && <Divider variant="middle" component="li" />}
        </>
    );
};

export default TrackCardItem;