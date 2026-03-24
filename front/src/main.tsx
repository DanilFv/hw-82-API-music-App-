import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline} from '@mui/material';
import {ToastContainer} from 'react-toastify';
import {Provider} from 'react-redux';
import {store} from './app/store.ts';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <StrictMode>
                <CssBaseline />
                <App />
                <ToastContainer />
            </StrictMode>
        </BrowserRouter>
    </Provider>,
)
