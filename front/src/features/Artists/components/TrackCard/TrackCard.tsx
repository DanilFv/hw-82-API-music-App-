import React from 'react';
import {Box, Container, List, Paper, Typography} from '@mui/material';
import type {ITracksResponse} from '../../../../types';
import TrackCardItem from './TrackCardItem';

interface Props {
    albumData: ITracksResponse;
    onTrackToPlay: (value: string) => void;
    playing: string | null;
}

const TrackCard: React.FC<Props> = ({ albumData, onTrackToPlay, playing }) => {
    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ p: 4, bgcolor: 'background.default' }}>
                    <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold', letterSpacing: 2 }}>
                        Исполнитель
                    </Typography>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 900, mb: 1 }}>
                        {albumData.artist}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        Альбом: {albumData.album}
                    </Typography>
                </Box>

                <List sx={{ p: 0 }}>
                    {albumData.tracks.map((track, index) => (
                        <TrackCardItem
                            key={track._id}
                            playing={playing}
                            track={track}
                            isLast={index === albumData.tracks.length - 1}
                            clickOnTrackToPlay={() => onTrackToPlay(track._id)}
                        />
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default TrackCard;