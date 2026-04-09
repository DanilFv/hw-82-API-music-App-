import type {ITracksResponse, ValidationError} from '../../../../types';
import {createSlice} from '@reduxjs/toolkit';
import {
    deleteTrack,
    fetchAddTrack,
    fetchTracks,
    toggleTrackPublished
} from './tracksThunks.ts';

interface TracksState {
    items: ITracksResponse | null;
    isLoading: boolean;
    isCreating: boolean;
    createError: ValidationError | null;
    deleteLoading: boolean;
    publishLoading: boolean;
}

const initialState: TracksState = {
    items: null,
    isLoading: false,
    isCreating: false,
    createError: null,
    deleteLoading: false,
    publishLoading: false,
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
           state.items = action.payload || null;
        });
        builder.addCase(fetchTracks.rejected, (state) => {
           state.isLoading = false;
        });

        builder.addCase(fetchAddTrack.pending, (state) => {
            state.isCreating = true;
            state.createError = null;
        });
        builder.addCase(fetchAddTrack.fulfilled, (state) => {
            state.isCreating = false;
        });
        builder.addCase(fetchAddTrack.rejected, (state, { payload }) => {
            state.isCreating = false;
            state.createError = payload || null;
        });

        builder.addCase(deleteTrack.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(deleteTrack.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteTrack.rejected, (state) => {
            state.deleteLoading = false;
        });

        builder.addCase(toggleTrackPublished.pending, (state) => {
            state.publishLoading = true;
        });
        builder.addCase(toggleTrackPublished.fulfilled, (state, { meta }) => {
            state.publishLoading = false;
            if (state.items) {
                const index = state.items.tracks.findIndex(track => track._id === meta.arg);
                if (index !== -1) {
                    state.items.tracks[index].isPublished = !state.items.tracks[index].isPublished;
                }
            }
        });
        builder.addCase(toggleTrackPublished.rejected, (state) => {
            state.publishLoading = false;
        });
    }
});

export const tracksReducer = tracksSlice.reducer;