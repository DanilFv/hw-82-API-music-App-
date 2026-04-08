import {Button, Menu, MenuItem} from '@mui/material';
import type {IUser} from '../../../types';
import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useAppDispatch} from '../../../app/hooks.ts';
import {logout} from '../../../features/users/store/userThunks.ts';

interface Props {
    user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
    const dispatch = useAppDispatch();
    const  [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        dispatch(logout());
    };

    return (
        <>
            <Button type='button' component={NavLink} to={`/track_history`} color='inherit'>
                My track History
            </Button>
            |
            <Button
                type='button'
                onClick={handleClick}
                color='inherit'
            >
                Hello {user.username}
            </Button>

            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;