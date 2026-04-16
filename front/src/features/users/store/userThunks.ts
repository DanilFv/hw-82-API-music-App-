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
        const formData = new FormData();

        formData.append('username', registerMutation.username);
        formData.append('password', registerMutation.password);
        formData.append('displayName', registerMutation.displayName);
        if (registerMutation.avatar) formData.append('avatar', registerMutation.avatar);

        const response = await axiosAPI.post<{ user: IUser, message: string }>('/users', formData);
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

export const logout = createAsyncThunk<void, void>(
    'users/logout',
    async () => {
        const response = await axiosAPI.delete<{message: string}>('/users/sessions');
        toast.success(response.data.message);
})

export const googleLogin = createAsyncThunk<IUser, string, {rejectValue: GlobalError}>('users/googleLogin',
    async (credential, {rejectWithValue}) => {
    try {
        const response = await axiosAPI.post<{user: IUser, message: string}>('/users/google', {credential});
        return response.data.user;
    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data as GlobalError);
        }
        throw e;
    }
});