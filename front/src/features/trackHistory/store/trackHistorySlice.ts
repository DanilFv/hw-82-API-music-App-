import type {GlobalError, ITrackHistoryResponse} from '../../../types';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {fetchTrackHistory, fetchTrackToHistory} from './trackHistoryThunks.ts';

interface trackHistoryState {
    items: ITrackHistoryResponse[];
    playingTrack: string | null;
    isLoading: boolean;
    fetchLoading: boolean;
    trackHistoryErrors: GlobalError | null;
}

const initialState: trackHistoryState = {
    items: [],
    playingTrack: null,
    isLoading: false,
    fetchLoading: false,
    trackHistoryErrors: null,
};

export const trackHistorySlice = createSlice({
    name: 'trackHistory',
    initialState,
    reducers: {
        stopTrack: (state) => {
            state.playingTrack = null;
        },
        setActiveTrack: (state, action: PayloadAction<string>) => {
            state.playingTrack = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTrackToHistory.pending, (state) => {
            state.isLoading = true;
            state.trackHistoryErrors = null;
        });
        builder.addCase(fetchTrackToHistory.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(fetchTrackToHistory.rejected, (state, { payload: error }) => {
            state.isLoading = false;
            state.trackHistoryErrors = error || null;
        });

        builder.addCase(fetchTrackHistory.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchTrackHistory.fulfilled, (state, action) => {
            state.fetchLoading= false;
            if (action.payload) state.items = action.payload;
        });
        builder.addCase(fetchTrackHistory.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const { stopTrack, setActiveTrack } = trackHistorySlice.actions;
export const trackHistoryReducer = trackHistorySlice.reducer;