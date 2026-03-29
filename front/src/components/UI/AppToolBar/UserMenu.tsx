import {Button, Menu, MenuItem} from '@mui/material';
import type {IUser} from '../../../types';
import {useState} from 'react';

interface Props {
    user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
    const  [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
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
                <MenuItem>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;