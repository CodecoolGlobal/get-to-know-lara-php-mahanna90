import React from 'react';
import NavBar from './NavBar';
import {ThemeProvider, createMuiTheme, makeStyles} from '@material-ui/core/styles';
import {deepOrange, teal} from "@material-ui/core/colors";
import MailList from "./MailList";
import Login from "./Login";
import {Alert, AlertTitle} from "@material-ui/lab";


function Home() {

    const theme = createMuiTheme({
        palette: {
            primary: teal,
            secondary: deepOrange,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <NavBar/>
            {sessionStorage.getItem('token') ?
                <MailList/>
                :
                <>
                    <Alert severity="warning" >
                        <AlertTitle>Warning</AlertTitle>
                        You are not logged in — <strong>Please sign in to check your mails!</strong>
                    </Alert>
                    <Login/>
                </>
            }
        </ThemeProvider>
    )
}

export default Home;