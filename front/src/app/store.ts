import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
    artistsReducer
} from '../features/Artists/store/artists/artistsSlice.ts';
import {albumsReducer} from '../features/Artists/store/albums/albumsSlice.ts';
import {tracksReducer} from '../features/Artists/store/tracks/tracksSlice.ts';
import {usersReducer} from '../features/users/store/usersSlice.ts';
// Вместо: import storage from 'redux-persist/lib/storage';
import storage from 'redux-persist/es/storage';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist';

const userPersistConfig = {
    key: 'store:users',
    storage,
    whitelist: ['user']
};

const rootReducer = combineReducers({
    users: persistReducer(userPersistConfig, usersReducer),
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;