import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import './App.css';

import OldHome from "./components/OldHome";
import Register from "./components/Register";
import Login from "./components/Login";
import MailList from "./components/MailList";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {deepOrange, teal} from "@material-ui/core/colors";
import NavDrawer from "./components/NavDrawer";
import {UserProvider} from "./contexts/UserContext";

function App() {

    const theme = createMuiTheme({
        palette: {
            primary: teal,
            secondary: deepOrange,
        },
    });

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <UserProvider>
                    <NavDrawer/>
                    {/*<Route exact path="/" children={<NavDrawer/>}/>*/}
                    {/*<Route exact path="/register" children={<Register/>}/>*/}
                    {/*<Route exact path="/login" children={<Login/>}/>*/}

                    {/*<UserProvider>*/}
                    {/*    <Route exact path="/mails"*/}
                    {/*           render={(props) => <MailList {...props} />}/>*/}
                    {/*    <Route path="/profile"*/}
                    {/*           render={(props) => (*/}
                    {/*               <>*/}
                    {/*                   <ProfilePage/>*/}
                    {/*               </>*/}
                    {/*           )}*/}
                    {/*    />*/}
                    {/*</UserProvider>*/}
                </UserProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
