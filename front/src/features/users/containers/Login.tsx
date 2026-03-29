import type {LoginMutation} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectLoginError, selectLoginLoading} from '../store/usersSelectors.ts';
import {login} from '../store/userThunks.ts';
import LoginForm from '../components/LoginForm/LoginForm.tsx';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectLoginError);
    const isLoading = useAppSelector(selectLoginLoading);

    const onSubmitHandler = async (data: LoginMutation) => {
        try {
           await dispatch(login(data)).unwrap();
           navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <LoginForm onSubmit={onSubmitHandler} thunkError={error ? error : null} isLoading={isLoading} />
        </>
    );
};

export default Login;