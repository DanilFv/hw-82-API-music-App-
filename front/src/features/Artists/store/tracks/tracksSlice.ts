import type {ITracksResponse} from '../../../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchTracks} from './tracksThunks.ts';

interface TracksState {
    items: ITracksResponse | null;
    isLoading: boolean
}

const initialState: TracksState = {
    items: null,
    isLoading: false,
}

export const tracksSlice = createSlice ({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTracks.pending, (state) => {
           state.isLoading = true;
        });
        builder.addCase(fetchTracks.fulfilled, (state, action) => {
           state.isLoading = false;
           if (action.payload) {
               state.items = action.payload;
           } else {
               state.items = null;
           }
        });
        builder.addCase(fetchTracks.rejected, (state) => {
           state.isLoading = false;
        });
    }
});

export const tracksReducer = tracksSlice.reducer;