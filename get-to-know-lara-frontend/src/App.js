import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import './App.css';

import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {deepOrange, teal} from "@material-ui/core/colors";
import Home from "./components/Home";
import {MessageProvider} from "./contexts/MessageContext";


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

                    <MessageProvider>
                        <Home/>
                    </MessageProvider>

            </ThemeProvider>
        </Router>
    );
}

export default App;
