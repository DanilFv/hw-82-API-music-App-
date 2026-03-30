import type {RootState} from '../../../app/store.ts';

export const selectTrackHistory = (state: RootState) => state.trackHistory.items;
export const selectPlayingTrack = (state: RootState) => state.trackHistory.playingTrack;
export const selectTrackHistoryErrors = (state: RootState) => state.trackHistory.trackHistoryErrors;
export const selectTrackHistoryLoading = (state: RootState) => state.trackHistory.fetchLoading;