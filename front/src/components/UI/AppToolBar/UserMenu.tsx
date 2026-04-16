import {Avatar, Box, Button, Menu, MenuItem} from '@mui/material';
import type {IUser} from '../../../types';
import {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../../app/hooks.ts';
import {logout} from '../../../features/users/store/userThunks.ts';
import {BASE_URL} from '../../../constants.ts';

interface Props {
    user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const  [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/');
    };

    const userAvatar = user.avatar?.startsWith('http')
    ? user.avatar
    : `${BASE_URL}/${user.avatar}`;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button type='button' component={NavLink} to={`/tracks/add-track`} color='inherit'>
                Add track
            </Button>

            <Button type='button' component={NavLink} to={`/artists/add-artist`} color='inherit'>
                Add artist
            </Button>

            <Button type='button' component={NavLink} to={`/albums/add-album`} color='inherit'>
                Add album
            </Button>

            <Button type='button' component={NavLink} to={`/track_history`} color='inherit'>
                My track History
            </Button>
            |
            <Button
                type='button'
                onClick={handleClick}
                color='inherit'
            >
                Hello {user.displayName || user.username}
            </Button>

            <Avatar alt={user.displayName} src={userAvatar} imgProps={{ referrerPolicy: 'no-referrer' }} />

            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;