import {Box, Divider, Typography} from '@mui/material';
import React from 'react';
import type {ITrackHistoryResponse} from '../../../../../types';

interface Props {
    tracksHistory: ITrackHistoryResponse;
}

const TrackHistoryCardItem: React.FC<Props> = ({ tracksHistory }) => {
    const formattedDate = new Date(tracksHistory.datetime).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <>
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'background-color 0.2s',
                    '&:hover': { bgcolor: 'action.hover' }
                }}
            >
                <Box>
                    <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {tracksHistory.track?.album?.artist?.name}
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        {tracksHistory.track?.title}
                    </Typography>
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" color="text.secondary">
                        Прослушано:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {formattedDate}
                    </Typography>
                </Box>
            </Box>
            <Divider />
        </>
    );
};

export default TrackHistoryCardItem;