import React from 'react';
import './app.css';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {darkTheme} from "../common/app/theme";
import {AppRoot} from "../common/Root/appRoot";

const App = () => {
    return (
        <main className="app">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <AppRoot/>
            </ThemeProvider>
        </main>
    );

}

export default App;