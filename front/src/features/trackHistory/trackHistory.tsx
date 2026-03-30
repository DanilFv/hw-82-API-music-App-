import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {
    selectTrackHistory,
    selectTrackHistoryLoading
} from './store/trackHistorySelectors.ts';
import {useEffect} from 'react';
import {fetchTrackHistory} from './store/trackHistoryThunks.ts';
import TrackHistoryCard
    from './components/TrackHistoryCard/TrackHistoryCard.tsx';
import {selectUser} from '../users/store/usersSelectors.ts';
import {useNavigate} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import {Typography} from '@mui/material';

const TrackHistory = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const history = useAppSelector(selectTrackHistory);
    const isLoading = useAppSelector(selectTrackHistoryLoading);

    useEffect(() => {
        dispatch(fetchTrackHistory());
    },[dispatch]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && history.length === 0 && <Typography component='h5' variant="h5">History not found</Typography>}
            {!isLoading && history.length > 0 && <TrackHistoryCard tracksHistory={history} />}
        </>
    );
};

export default TrackHistory;