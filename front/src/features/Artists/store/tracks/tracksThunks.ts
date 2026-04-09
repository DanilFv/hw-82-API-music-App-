import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../../../../axiosAPI.ts';
import type {
    ITrackMutation,
    ITracksResponse,
    ValidationError
} from '../../../../types';
import {isAxiosError} from 'axios';


export const fetchTracks = createAsyncThunk<ITracksResponse, string>(
    'tracks/fetchTracks',
    async (albumId) => {
        const response = await axiosAPI.get<ITracksResponse>(`/tracks/${albumId}`);
        return response.data;
    }
);

export const fetchAddTrack = createAsyncThunk<void, ITrackMutation, { rejectValue: ValidationError }>(
    'tracks/addTrack',
    async (trackData, { rejectWithValue }) => {
        try {
            await axiosAPI.post('/tracks', trackData);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const deleteTrack = createAsyncThunk<void, string>(
  'tracks/delete',
  async (id) => {
    await axiosAPI.delete(`/tracks/${id}`);
  }
);

export const toggleTrackPublished = createAsyncThunk<void, string>(
  'tracks/togglePublished',
  async (id) => {
    await axiosAPI.patch(`/tracks/${id}`);
  }
);