import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { ThemeProvider } from '@mui/material';
import App from './App';
import {store} from "./app/store";
import theme from "./theme";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
);
