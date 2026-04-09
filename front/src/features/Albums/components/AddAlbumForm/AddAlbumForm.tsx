import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextField,
    Typography
} from '@mui/material';
import type {
    IAlbumMutation,
    IArtists,
    ValidationError
} from '../../../../types';
import FileInput from '../../../../components/UI/FileInput/FileInput.tsx';

interface Props {
    artists: IArtists[];
    onSubmit: (data: IAlbumMutation) => void;
    loading?: boolean;
    serverError?: ValidationError | null;
}

const AddAlbumForm: React.FC<Props> = ({ artists, onSubmit, loading, serverError }) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<IAlbumMutation>({
        defaultValues: {
            title: '',
            artist: '',
            release_date: new Date().getFullYear(),
            photo: null
        }
    });

    const onSubmitHandler = (data: IAlbumMutation) => {
        onSubmit(data);
        reset();
    };

    const getServerFieldError = (field: keyof IAlbumMutation): string | undefined => {
        return serverError?.errors?.[field]?.message;
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                Add New Album
            </Typography>

            <Grid container spacing={3}>
                <Grid size={12}>
                    <TextField
                        select
                        label="Artist"
                        fullWidth
                        defaultValue=""
                        {...register('artist', { required: 'Artist is required' })}
                        error={!!errors.artist || !!getServerFieldError('artist')}
                        helperText={errors.artist?.message || getServerFieldError('artist')}
                    >
                        <MenuItem value="" disabled>Select an artist</MenuItem>
                        {artists.map((artist) => (
                            <MenuItem key={artist._id} value={artist._id}>
                                {artist.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={12}>
                    <TextField
                        label="Album Title"
                        fullWidth
                        {...register('title', {
                            required: 'Title is required',
                        })}
                        error={!!errors.title || !!getServerFieldError('title')}
                        helperText={errors.title?.message || getServerFieldError('title')}
                    />
                </Grid>

                <Grid size={12}>
                    <TextField
                        label="Release Year"
                        type="number"
                        fullWidth
                        {...register('release_date', {
                            required: 'Year is required',
                            min: { value: 1900, message: 'Minimum 1900 year' },
                            max: { value: new Date().getFullYear(), message: 'The year cannot be future'}
                        })}
                        error={!!errors.release_date || !!getServerFieldError('release_date')}
                        helperText={errors.release_date?.message || getServerFieldError('release_date')}
                    />
                </Grid>

                <Grid size={12}>
                    <Controller
                        name="photo"
                        control={control}
                        render={({ field: { onChange, name } }) => (
                            <FileInput
                                label="Album Cover"
                                name={name}
                                onChange={(e) => {
                                    const file = e.target.files ? e.target.files[0] : null;
                                    onChange(file);
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid size={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={loading}
                        loadingPosition='center'
                        disabled={loading}
                        size="large"
                    >
                        Create Album
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddAlbumForm;