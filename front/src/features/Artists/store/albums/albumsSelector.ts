import {type RootState} from '../../../../app/store.ts';

export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsLoading = (state: RootState) => state.albums.isLoading;