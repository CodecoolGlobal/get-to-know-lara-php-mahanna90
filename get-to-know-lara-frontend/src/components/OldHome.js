import React from 'react';
import {ThemeProvider, createMuiTheme, makeStyles} from '@material-ui/core/styles';
import {deepOrange, teal} from "@material-ui/core/colors";
import NavDrawer from "./Home";


function OldHome() {

    const theme = createMuiTheme({
        palette: {
            primary: teal,
            secondary: deepOrange,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <NavDrawer />

        </ThemeProvider>
    )
}

export default OldHome;