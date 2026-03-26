import type {IArtists} from '../../../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchArtists} from './artistsThunks.ts';

interface ArtistsState {
    items: IArtists[],
    isLoading: boolean,
}

const initialState: ArtistsState = {
    items: [],
    isLoading: false,
}

export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArtists.pending, (state) => {
           state.isLoading = true;
        });
        builder.addCase(fetchArtists.fulfilled, (state, action) => {
           state.isLoading = false;
           state.items = action.payload;
        });
        builder.addCase(fetchArtists.rejected, (state) => {
           state.isLoading = false;
        });
    }
});

export const artistsReducer = artistsSlice.reducer;