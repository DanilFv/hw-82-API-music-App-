import {Divider, ListItem, ListItemText, Typography} from '@mui/material';
import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import type {ITrackItem} from '../../../../types';
import PauseIcon from '@mui/icons-material/Pause';

interface Props {
    track: ITrackItem;
    isLast: boolean;
    clickOnTrackToPlay: (value: string) => void;
    playing: string | null;
}

const TrackCardItem: React.FC<Props> = ({ track, isLast, clickOnTrackToPlay, playing }) => {
    const isCurrentPlaying = playing === track._id;

    return (
        <>
            <ListItem
                sx={{
                    py: 1.5,
                    transition: 'background 0.2s',
                    bgcolor: isCurrentPlaying ? 'action.selected' : 'transparent',
                    '&:hover': { bgcolor: 'action.hover' }
                }}
            >
                <Typography variant="body1" sx={{ minWidth: '40px', color: 'text.secondary', fontWeight: 500 }}>
                    {track.track_number}
                </Typography>
                <IconButton type='button' color={isCurrentPlaying ? 'primary' : 'default'} sx={{ mr: 1 }} onClick={() => clickOnTrackToPlay(track._id)}>
                    {isCurrentPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <ListItemText
                    primary={track.title}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                    {track.duration}
                </Typography>
            </ListItem>
            {!isLast && <Divider variant="middle" component="li" />}
        </>
    );
};

export default TrackCardItem;