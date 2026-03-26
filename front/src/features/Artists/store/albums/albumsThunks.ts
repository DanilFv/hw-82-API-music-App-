import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../../../../axiosAPI.ts';
import type {IAlbums} from '../../../../types';

export const fetchAlbums = createAsyncThunk<IAlbums[], string>('/albums/fetchAlbums',
    async (artistId) => {
    const response = await axiosAPI.get<IAlbums[]>(`/albums?artistId=${artistId}`);
    return response.data;
});