import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import type {IArtistMutation, ValidationError} from '../../../../types';
import FileInput from '../../../../components/UI/FileInput/FileInput.tsx';

interface Props {
    onSubmit: (data: IArtistMutation) => void;
    loading?: boolean;
    serverError?: ValidationError | null;
}

const AddArtistForm: React.FC<Props> = ({ onSubmit, loading, serverError, }) => {

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<IArtistMutation>({
        defaultValues: {
            name: '',
            description: '',
            photo: null
        }
    });

    const onSubmitHandler = (data: IArtistMutation) => {
        onSubmit(data);
        reset();
    };

    const getServerFieldError = (field: keyof IArtistMutation): string | undefined => {
        return serverError?.errors?.[field]?.message;
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                Add Artist
            </Typography>

            <Grid container spacing={3}>
                <Grid size={12}>
                    <TextField
                        label="Name"
                        fullWidth
                        {...register('name', {
                            required: 'name is required',
                            minLength: { value: 3, message: 'Минимум 3 символа' }
                        })}
                        error={!!errors.name || !!getServerFieldError('name')}
                        helperText={errors.name?.message || getServerFieldError('name')}
                    />
                </Grid>

                <Grid size={12}>
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        {...register('description')}
                    />
                </Grid>

                <Grid size={12}>
                    <Controller
                        name="photo"
                        control={control}
                        render={({ field: { onChange, name } }) => (
                            <FileInput
                                label="Image"
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
                        loadingPosition="center"
                        disabled={loading}
                        size="large"
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddArtistForm;