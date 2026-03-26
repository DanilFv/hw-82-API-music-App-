import {type RootState} from '../../../../app/store.ts';

export const selectArtists = (state: RootState) => state.artists.items;
export const selectIsLoading = (state: RootState) => state.artists.isLoading;