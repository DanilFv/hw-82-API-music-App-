import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../../../../axiosAPI.ts';
import type {
    IArtistMutation,
    IArtists,
    ValidationError
} from '../../../../types';
import {isAxiosError} from 'axios';

export const fetchArtists = createAsyncThunk<IArtists[], void>('/artists/fetchArtists',
    async () => {
    const response = await axiosAPI<IArtists[]>('/artists');
    return response.data;
});

export const fetchAddArtist = createAsyncThunk<void, IArtistMutation, { rejectValue: ValidationError }>('/artists/addArtist',
    async (data, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);

        if (data.photo) {
            formData.append('photo', data.photo);
        }
        await axiosAPI.post('/artists', formData);
    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data as ValidationError);
        }
        throw e;
    }
});

export const deleteArtist = createAsyncThunk<void, string>(
  'artists/delete',
  async (id) => {
    await axiosAPI.delete(`/artists/${id}`);
  }
);

export const toggleArtistPublished = createAsyncThunk<void, string>(
  'artists/togglePublished',
  async (id) => {
    await axiosAPI.patch(`/artists/${id}`);
  }
);