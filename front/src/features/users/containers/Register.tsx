import RegisterForm from '../components/RegisterForm/RegisterForm.tsx';
import type {RegisterMutation} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {
    selectRegisterError,
    selectRegisterLoading
} from '../store/usersSelectors.ts';
import {googleLogin, register} from '../store/userThunks.ts';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const isLoading = useAppSelector(selectRegisterLoading);

    const onSubmitHandler = async (data: RegisterMutation) => {
        try {
           await dispatch(register(data)).unwrap();
           navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

     const onGoogleLogin = async (credential: string) => {
        await dispatch(googleLogin(credential)).unwrap();
        navigate('/');
    };

    return (
        <div>
            <RegisterForm onSubmit={onSubmitHandler} isLoading={isLoading} error={error} googleLoginHandler={onGoogleLogin} />
        </div>
    );
};

export default Register;