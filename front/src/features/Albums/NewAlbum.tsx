import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {
    selectAlbumCreateError,
    selectAlbumCreateLoading
} from '../Artists/store/albums/albumsSelector.ts';
import {useNavigate} from 'react-router-dom';
import {selectArtists} from '../Artists/store/artists/artistsSelector.ts';
import AddAlbumForm from './components/AddAlbumForm/AddAlbumForm.tsx';
import {fetchAddAlbum} from '../Artists/store/albums/albumsThunks.ts';
import {toast} from 'react-toastify';
import type {IAlbumMutation} from '../../types';
import {useEffect} from 'react';
import {fetchArtists} from '../Artists/store/artists/artistsThunks.ts';
import {selectUser} from '../users/store/usersSelectors.ts';


const NewAlbum = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    const artists = useAppSelector(selectArtists);
    const isCreating = useAppSelector(selectAlbumCreateLoading);
    const error = useAppSelector(selectAlbumCreateError);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
        dispatch(fetchArtists());
    },[dispatch, user]);

    const onFormSubmit = async (albumData: IAlbumMutation) => {
        try {
            await dispatch(fetchAddAlbum(albumData)).unwrap();
            toast.success('Albums added successfully.');

            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <>
            <AddAlbumForm artists={artists} loading={isCreating} serverError={error} onSubmit={onFormSubmit} />
        </>
    );
};

export default NewAlbum;