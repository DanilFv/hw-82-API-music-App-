import {type RootState} from '../../../../app/store.ts';

export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksLoading = (state: RootState) => state.tracks.isLoading;