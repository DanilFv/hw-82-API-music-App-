import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../../../../axiosAPI.ts';
import type {ITracks} from '../../../../types';

export const fetchTracks = createAsyncThunk<ITracks, string>('/tracks/fetchTracks',
    async (albumId) => {
    const response = await axiosAPI.get<ITracks>(`/tracks/${albumId}`);
    return response.data;
});