import type {IArtists, ValidationError} from '../../../../types';
import {createSlice} from '@reduxjs/toolkit';
import {
    deleteArtist,
    fetchAddArtist,
    fetchArtists,
    toggleArtistPublished
} from './artistsThunks.ts';

interface ArtistsState {
    items: IArtists[];
    isLoading: boolean;
    createLoading: boolean;
    createError: ValidationError | null;
    deleteLoading: boolean;
    publishLoading: boolean;
}

const initialState: ArtistsState = {
    items: [],
    isLoading: false,
    createLoading: false,
    createError: null,
    deleteLoading: false,
    publishLoading: false,
}

export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArtists.pending, (state) => { state.isLoading = true; });
        builder.addCase(fetchArtists.fulfilled, (state, action) => {
           state.isLoading = false;
           state.items = action.payload;
        });
        builder.addCase(fetchArtists.rejected, (state) => { state.isLoading = false; });

        builder.addCase(fetchAddArtist.pending, (state) => {
           state.createLoading = true;
           state.createError = null;
        });
        builder.addCase(fetchAddArtist.fulfilled, (state) => { state.createLoading = false; });
        builder.addCase(fetchAddArtist.rejected, (state, { payload }) => {
           state.createLoading = false;
           state.createError = payload || null;
        });

        builder.addCase(deleteArtist.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(deleteArtist.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteArtist.rejected, (state) => {
            state.deleteLoading = false;
        });

        builder.addCase(toggleArtistPublished.pending, (state) => {
            state.publishLoading = true;
        });
        builder.addCase(toggleArtistPublished.fulfilled, (state, { meta }) => {
            state.publishLoading = false;
            const index = state.items.findIndex(artist => artist._id === meta.arg);
            if (index !== -1) {
                state.items[index].isPublished = !state.items[index].isPublished;
            }
        });
        builder.addCase(toggleArtistPublished.rejected, (state) => {
            state.publishLoading = false;
        });
    }
});

export const artistsReducer = artistsSlice.reducer;