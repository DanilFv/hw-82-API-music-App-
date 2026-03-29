import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../../../axiosAPI.ts';
import type {
    GlobalError,
    IUser,
    LoginMutation,
    RegisterMutation,
    ValidationError
} from '../../../types';
import {isAxiosError} from 'axios';
import {toast} from 'react-toastify';

export const register = createAsyncThunk<IUser, RegisterMutation, {rejectValue: ValidationError}>('users/register',
    async (registerMutation, {rejectWithValue}) => {
    try {
        const response = await axiosAPI.post<{ user: IUser, message: string }>('/users', registerMutation);
        toast.success(response.data.message);
        return response.data.user;
    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
});

export const login = createAsyncThunk<IUser, LoginMutation, {rejectValue: GlobalError}>('users/login',
    async (loginMutation, {rejectWithValue}) => {
    try {
        const response = await axiosAPI.post<{ user: IUser, message: string }>('/users/session', loginMutation);
        toast.success(response.data.message);
        return response.data.user;
    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data as GlobalError);
        }
        throw e;
    }
});