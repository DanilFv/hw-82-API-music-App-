import './App.css';
import AppToolBar from './components/UI/AppToolBar/AppToolBar.tsx';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Artists from './features/Artists/containers/Artists.tsx';
import ArtistFull from './features/Artists/containers/ArtistFull.tsx';
import AlbumTracks from './features/Artists/containers/AlbumTracks.tsx';
import Register from './features/users/containers/Register.tsx';
import Login from './features/users/containers/Login.tsx';
import TrackHistory from './features/trackHistory/trackHistory.tsx';

const App = () => {

  return (
    <>
        <AppToolBar />

        <Container>
            <Routes>
                <Route path='/register' element={(<Register />)} />
                <Route path='/login' element={(<Login />)} />

                <Route path="/" element={(<Artists />)} />
                <Route path='/track_history' element={(<TrackHistory />)} />
                <Route path='/albums' element={(<ArtistFull />)} />
                <Route path='/albums/:id/tracks' element={(<AlbumTracks />)} />





                <Route path="*" element={(<Typography variant='h5' component='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>Not Found Page.</Typography>)} />
            </Routes>
        </Container>
    </>
  )
};

export default App
