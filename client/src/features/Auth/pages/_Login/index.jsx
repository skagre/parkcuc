import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import { authLogin } from 'features/Auth/authSlice'

import {
    Box, 
    Button,
    TextField, 
    Typography,
    Snackbar
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined'

import useStyles from './style'
import Loading from 'components/_Loading'


const Login = props => {
    const classes = useStyles()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const history = useHistory()
    const dispatch = useDispatch()
    const [alert, setAlert] = useState(null)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setAlert(null)
    }
    
    const onSubmit = async (data) => { 
        try {
            const { emailOrSomething, password } = data
            if (!emailOrSomething) return setAlert({ state: 'warning', msg: "Oops! emailOrSomething field may not be blank." })
            else if (!password) return setAlert({ state: 'warning', msg: "Oops! Password field may not be blank." })

            const actionResult = await dispatch(authLogin({ emailOrSomething, password }))
            const loginStatus = unwrapResult(actionResult);
            if (loginStatus.errors) {
                setAlert({ state: 'error', msg: loginStatus })
            } else {
                setAlert({ state: 'success', msg: 'Logged in successfully!"' })
                history.push('/')
            }
        } catch (err) {
            setAlert({ state: 'warning', msg: 'Oops! Failed to login.' })
        }
    }

    return (
        <>
        {isSubmitting && <Loading />}
        {alert &&
            <Snackbar open autoHideDuration={10000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert variant="filled" onClose={handleClose} severity={alert.state}>
                    {alert.state === 'error' ? alert.msg.errors.map(e => e.message) : alert.msg}
                </MuiAlert>
            </Snackbar>
        }
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Box className={classes.box}>
                <Typography className={classes.icon}>
                    <TextsmsOutlinedIcon />
                    <h1>Parkcuc / Login</h1>
                </Typography>
                <TextField
                    className={classes.input}
                    label="Email Or Something"
                    variant="outlined"
                    name="emailOrSomething"
                    inputRef={register()}
                />
                <TextField
                    className={classes.input}
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    inputRef={register()}
                />
                <Link className={classes.link} to="/register">
                    <Typography>Don't have an account? Register</Typography>
                </Link>
                <Button className={classes.button} type="submit">Login</Button>
            </Box>
        </form>
        </>
    )
}

export default Login