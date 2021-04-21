import React from 'react';
import {Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import MailList from "./components/MailList";

function App() {
  return (
      <Router>
        <Route exact path="/" children={<Home />} />
        <Route exact path="/register" children={<Register />} />
        <Route exact path="/login" children={<Login />} />

        <Route exact path="/mails"
          render={(props) => <MailList {...props} />} />

      </Router>
  );
}

export default App;
