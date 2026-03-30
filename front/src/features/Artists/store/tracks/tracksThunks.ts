import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../../../../axiosAPI.ts';
import type {RootState} from '../../../../app/store.ts';
import type {ITracksResponse} from '../../../../types';

export const fetchTracks = createAsyncThunk<ITracksResponse, string, { state: RootState }>('/tracks/fetchTracks',
    async (albumId, { getState }) => {

    const token = getState().users.user?.token;

    const response = await axiosAPI.get<ITracksResponse>(`/tracks/${albumId}`, {
        headers: {
            'Authorization': token
        }
    });
    return response.data;
});