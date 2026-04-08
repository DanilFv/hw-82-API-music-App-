import {createAsyncThunk} from '@reduxjs/toolkit';
import type {RootState} from '../../../app/store.ts';
import {setActiveTrack, stopTrack} from './trackHistorySlice.ts';
import axiosAPI from '../../../axiosAPI.ts';
import type {GlobalError, ITrackHistoryResponse} from '../../../types';
import {isAxiosError} from 'axios';

export const fetchTrackToHistory = createAsyncThunk<void, string, { state: RootState, rejectValue: GlobalError }>('/trackHistory/addTrackToHistory',
    async (trackId, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const isAlreadyPlaying = state.trackHistory.playingTrack === trackId;

    if (isAlreadyPlaying) {
        dispatch(stopTrack());
    } else {
        dispatch(setActiveTrack(trackId));

        try {
            await axiosAPI.post('/track_history', { track: trackId});

        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw e;
        }
    }
});

export const fetchTrackHistory = createAsyncThunk<ITrackHistoryResponse[], void>('/track_history/getAllHistory',
    async () => {

    try{
        const response = await axiosAPI.get<ITrackHistoryResponse[]>('/track_history');
        return response.data || [];
    } catch (e) {
        console.error('Not found', e);
        return [];
    }
});