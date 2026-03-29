import {AppBar, Box, Container, Grid, Toolbar, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {useAppSelector} from '../../../app/hooks.ts';
import {selectUser} from '../../../features/users/store/usersSelectors.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';

const AppToolBar = () => {
    const user = useAppSelector(selectUser);

    return (
        <Box sx={{ flexGrow: 1, mb: 5 }}>
            <AppBar position="static" color="primary">
                <Container>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component={NavLink} to='/'
                            sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
                        >
                            Spotify
                        </Typography>

                        <Grid>
                            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default AppToolBar;