import type {IAlbums, ValidationError} from '../../../../types';
import {createSlice} from '@reduxjs/toolkit';
import {
    deleteAlbum,
    fetchAddAlbum,
    fetchAlbums,
    toggleAlbumPublished
} from './albumsThunks.ts';

interface AlbumsState {
    items: IAlbums[];
    isLoading: boolean;
    createLoading: boolean;
    createError: ValidationError | null;
    deleteLoading: boolean;   // Добавлено для удаления
    publishLoading: boolean;  // Добавлено для публикации
}

const initialState: AlbumsState = {
    items: [],
    isLoading: false,
    createError: null,
    createLoading: false,
    deleteLoading: false,
    publishLoading: false,
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
           state.items = action.payload || [];
        });
        builder.addCase(fetchAlbums.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(fetchAddAlbum.pending, (state) => {
           state.createLoading = true;
           state.createError = null;
        });
        builder.addCase(fetchAddAlbum.fulfilled, (state) => {
           state.createLoading = false
        });
        builder.addCase(fetchAddAlbum.rejected, (state, { payload }) => {
            state.createLoading = false;
            state.createError = payload || null;
        });

        builder.addCase(deleteAlbum.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(deleteAlbum.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteAlbum.rejected, (state) => {
            state.deleteLoading = false;
        });

        builder.addCase(toggleAlbumPublished.pending, (state) => {
            state.publishLoading = true;
        });
        builder.addCase(toggleAlbumPublished.fulfilled, (state, { meta }) => {
            state.publishLoading = false;
            const index = state.items.findIndex(album => album._id === meta.arg);
            if (index !== -1) {
                state.items[index].isPublished = !state.items[index].isPublished;
            }
        });
        builder.addCase(toggleAlbumPublished.rejected, (state) => {
            state.publishLoading = false;
        });
    }
});

export const albumsReducer = albumsSlice.reducer;