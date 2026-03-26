import type {IAlbums} from '../../../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchAlbums} from './albumsThunks.ts';


interface AlbumsState {
    items: IAlbums[];
    isLoading: boolean;
}

const initialState: AlbumsState = {
    items: [],
    isLoading: false,
}

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAlbums.pending, (state) => {
           state.isLoading = true;
        });
        builder.addCase(fetchAlbums.fulfilled, (state, action) => {
           state.isLoading = false;
           if (action.payload) {
               state.items = action.payload;
           } else {
               state.items = [];
           }
        });
        builder.addCase(fetchAlbums.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const albumsReducer = albumsSlice.reducer;