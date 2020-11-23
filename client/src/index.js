import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Login from './features/Auth/pages/Login'
import Register from './features/Auth/pages/Register'
import Messenger from './features/Messenger'

import './style.css';


ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Messenger} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect from="*" to="/" />
        </Switch>
    </Router>,
    document.getElementById('root')
);
