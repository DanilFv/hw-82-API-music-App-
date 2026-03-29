import RegisterForm from '../components/RegisterForm/RegisterForm.tsx';
import type {RegisterMutation} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {
    selectRegisterError,
    selectRegisterLoading
} from '../store/usersSelectors.ts';
import {register} from '../store/userThunks.ts';
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
    }

    return (
        <div>
            <RegisterForm onSubmit={onSubmitHandler} isLoading={isLoading} error={error} />
        </div>
    );
};

export default Register;