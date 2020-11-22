import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Login from './Login'
import Register from './Register'
import Messenger from './Messenger'

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
