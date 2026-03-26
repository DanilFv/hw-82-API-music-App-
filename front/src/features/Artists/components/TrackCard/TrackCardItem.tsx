import {Divider, ListItem, ListItemText, Typography} from '@mui/material';
import React from 'react';
import type {ITracks} from '../../../../types';

interface Props {
    track: ITracks['tracks'][0];
    isLast: boolean;
}

const TrackCardItem: React.FC<Props> = ({ track, isLast }) => {
    return (
        <>
            <ListItem
                sx={{
                    py: 1.5,
                    transition: 'background 0.2s',
                    '&:hover': { bgcolor: 'action.hover' }
                }}
            >
                <Typography variant="body1" sx={{ minWidth: '40px', color: 'text.secondary', fontWeight: 500 }}>
                    {track.track_number}
                </Typography>
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