import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../../../axiosAPI.ts';
import type {IArtists} from '../../../types';

export const fetchArtists = createAsyncThunk<IArtists[], void>('/artists/fetchArtists',
    async () => {
    const response = await axiosAPI<IArtists[]>('/artists');
    return response.data;
});