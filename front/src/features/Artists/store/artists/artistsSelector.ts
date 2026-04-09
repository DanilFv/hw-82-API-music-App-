import {type RootState} from '../../../../app/store.ts';

export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtistCreateErrors = (state: RootState) => state.artists.createError

export const selectIsLoading = (state: RootState) => state.artists.isLoading;
export const selectCreateLoading = (state: RootState) => state.artists.createLoading;

export const selectArtistDeleteLoading = (state: RootState) => state.artists.deleteLoading;
export const selectArtistPublishLoading = (state: RootState) => state.artists.publishLoading;