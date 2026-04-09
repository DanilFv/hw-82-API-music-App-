import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextField,
    Typography
} from '@mui/material';
import type {
    IAlbums,
    IArtists,
    ITrackMutation,
    ValidationError
} from '../../../../types';

interface Props {
    artists: IArtists[];
    albums: IAlbums[];
    onSubmit: (data: ITrackMutation) => void;
    onArtistChange: (artistId: string) => void;
    loading?: boolean;
    serverError?: ValidationError | null;
}

const AddTrackForm: React.FC<Props> = ({ artists, albums, onSubmit, onArtistChange, loading, serverError }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm<ITrackMutation>({
        defaultValues: {
            title: '',
            album: '',
            duration: '',
            track_number: 1,
        }
    });

    const onSubmitHandler = (data: ITrackMutation) => {
        onSubmit(data);
        reset();
    };

    const selectedArtist = watch('artist' as any);

    useEffect(() => {
        if (selectedArtist) {
            onArtistChange(selectedArtist);
        }
    }, [selectedArtist, onArtistChange]);

    const getServerFieldError = (field: keyof ITrackMutation): string | undefined => {
        return serverError?.errors?.[field]?.message;
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                Add New Track
            </Typography>

            <Grid container spacing={3}>
                <Grid size={12}>
                    <TextField
                        select
                        label="Artist"
                        fullWidth
                        defaultValue=""
                        {...register('artist' as any, { required: 'Please select an artist' })}
                    >
                        {artists.map((artist) => (
                            <MenuItem key={artist._id} value={artist._id}>
                                {artist.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={12}>
                    <TextField
                        select
                        label="Album"
                        fullWidth
                        defaultValue=""
                        disabled={!selectedArtist || albums.length === 0}
                        {...register('album', { required: 'Album is required' })}
                        error={!!errors.album || !!getServerFieldError('album')}
                        helperText={errors.album?.message || getServerFieldError('album') || (selectedArtist && albums.length === 0 ? "This artist has no albums" : "")}
                    >
                        {albums.map((album) => (
                            <MenuItem key={album._id} value={album._id}>
                                {album.title}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={12}>
                    <TextField
                        label="Track Title"
                        fullWidth
                        {...register('title', { required: 'Title is required' })}
                        error={!!errors.title || !!getServerFieldError('title')}
                        helperText={errors.title?.message || getServerFieldError('title')}
                    />
                </Grid>

                <Grid size={6}>
                    <TextField
                        label="Duration"
                        placeholder="3:45"
                        fullWidth
                        {...register('duration', { required: 'Duration is required' })}
                        error={!!errors.duration || !!getServerFieldError('duration')}
                        helperText={errors.duration?.message || getServerFieldError('duration')}
                    />
                </Grid>

                <Grid size={6}>
                    <TextField
                        label="Track Number"
                        type="number"
                        fullWidth
                        {...register('track_number', { required: 'Required', min: 1 })}
                        error={!!errors.track_number || !!getServerFieldError('track_number')}
                        helperText={errors.track_number?.message || getServerFieldError('track_number')}
                    />
                </Grid>

                <Grid size={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={loading}
                        disabled={loading}
                        size="large"
                    >
                        Create Track
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddTrackForm;