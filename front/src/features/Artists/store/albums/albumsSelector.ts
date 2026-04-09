import {type RootState} from '../../../../app/store.ts';

export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsLoading = (state: RootState) => state.albums.isLoading;

export const selectAlbumCreateLoading = (state: RootState) => state.albums.createLoading;
export const selectAlbumCreateError = (state: RootState) => state.albums.createError;

export const selectAlbumDeleteLoading = (state: RootState) => state.albums.deleteLoading;
export const selectAlbumPublishLoading = (state: RootState) => state.albums.publishLoading;