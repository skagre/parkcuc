import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            localStorage.getItem('jwt')
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}

export default PrivateRoute