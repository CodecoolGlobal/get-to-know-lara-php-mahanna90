import React from 'react';
import NavBar from './NavBar';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {deepOrange, teal} from "@material-ui/core/colors";

function Home() {

    const theme = createMuiTheme({
        palette: {
            primary: teal,
            secondary: deepOrange,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <NavBar />
        </ThemeProvider>
    )
}

export default Home;