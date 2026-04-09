import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../../../../axiosAPI.ts';
import type {IAlbumMutation, IAlbums, ValidationError} from '../../../../types';
import {isAxiosError} from 'axios';

export const fetchAlbums = createAsyncThunk<IAlbums[], string>('/albums/fetchAlbums',
    async (artistId) => {
    const response = await axiosAPI.get<IAlbums[]>(`/albums?artistId=${artistId}`);
    return response.data;
});

export const fetchAddAlbum = createAsyncThunk<void, IAlbumMutation, { rejectValue: ValidationError }>(
    'albums/addAlbum',
    async (albumData, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            formData.append('title', albumData.title);
            formData.append('artist', albumData.artist);
            formData.append('release_date', albumData.release_date.toString());

            if (albumData.photo) {
                formData.append('photo', albumData.photo);
            }

            await axiosAPI.post('/albums', formData);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const deleteAlbum = createAsyncThunk<void, string>(
  'albums/delete',
  async (id) => {
    await axiosAPI.delete(`/albums/${id}`);
  }
);

export const toggleAlbumPublished = createAsyncThunk<void, string>(
  'albums/togglePublished',
  async (id) => {
    await axiosAPI.patch(`/albums/${id}`);
  }
);
