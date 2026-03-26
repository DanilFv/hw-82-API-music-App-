import './App.css';
import AppToolBar from './components/UI/AppToolBar/AppToolBar.tsx';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Artists from './features/Artists/containers/Artists.tsx';
import ArtistFull from './features/Artists/containers/ArtistFull.tsx';

const App = () => {

  return (
    <>
        <AppToolBar />

        <Container>
            <Routes>
                <Route path="/" element={(<Artists />)} />
                <Route path='/albums' element={(<ArtistFull />)} />


                <Route path="*" element={(<Typography variant='h5' component='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>Not Found Page.</Typography>)} />
            </Routes>
        </Container>
    </>
  )
};

export default App
