import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'app/store'
import PrivateRoute from 'app/privateRoute'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"

import './style.css'
import Loading from 'components/_Loading'

const Login = lazy(() => import('features/Auth/pages/_Login'))
const Register = lazy(() => import('features/Auth/pages/_Register'))
const Messenger = lazy(() => import('features/Messenger'))
const NotFound = lazy(() => import('components/_NotFound'))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <PrivateRoute exact path="/" component={Messenger} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route exact path="/error" component={NotFound} />
                    <Redirect from="*" to="/error" component={NotFound} />
                </Switch>
            </Suspense>
        </Router>
    </Provider>,
    document.getElementById('root')
);
