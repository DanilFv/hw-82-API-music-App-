import AddArtistForm from '../components/AddArtistForm/AddArtistForm.tsx';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectCreateLoading} from '../store/artists/artistsSelector.ts';
import type {IArtistMutation} from '../../../types';
import {fetchAddArtist} from '../store/artists/artistsThunks.ts';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {selectUser} from '../../users/store/usersSelectors.ts';
import {useEffect} from 'react';


const NewArtist = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectCreateLoading);
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    },[user]);

    const addArtist = async (data: IArtistMutation) => {
        try {
            await dispatch(fetchAddArtist(data)).unwrap();
            toast.success('Artist added successfully.');
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <AddArtistForm loading={isLoading} onSubmit={addArtist} />
        </>
    );
};

export default NewArtist;