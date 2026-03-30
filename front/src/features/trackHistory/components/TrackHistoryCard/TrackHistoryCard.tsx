import {Box, Container, Paper, Typography} from '@mui/material';
import React from 'react';
import type {ITrackHistoryResponse} from '../../../../types';
import TrackHistoryCardItem
    from './TrackHistoryCardItem/TrackHistoryCardItem.tsx';

interface Props {
    tracksHistory: ITrackHistoryResponse[];
}

const TrackHistoryCard: React.FC<Props> = ({ tracksHistory }) => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                История прослушиваний
            </Typography>
            <Paper
                elevation={3}
                sx={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                {tracksHistory.length > 0 ? (
                    tracksHistory.map(history => (
                        <TrackHistoryCardItem key={history._id} tracksHistory={history} />
                    ))
                ) : (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Typography color="text.secondary">История пока пуста</Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default TrackHistoryCard;