import {type RootState} from '../../../../app/store.ts';

export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksLoading = (state: RootState) => state.tracks.isLoading;

export const selectTrackCreateLoading = (state: RootState) => state.tracks.isCreating;
export const selectTrackCreateError = (state: RootState) => state.tracks.createError;

export const selectTrackDeleteLoading = (state: RootState) => state.tracks.deleteLoading;
export const selectTrackPublishLoading = (state: RootState) => state.tracks.publishLoading;