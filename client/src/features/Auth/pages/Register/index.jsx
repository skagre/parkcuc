import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import { authRegister } from 'features/Auth/authSlice'

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
import Loading from 'components/Loading'


const Register = props => {
    const classes = useStyles()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const dispatch = useDispatch()
    const [alert, setAlert] = useState(null)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setAlert(null)
    }

    const onSubmit = async data => {
        try {
            const { name, email, password, confirm_password } = data
            if (!name) return setAlert({ state: 'warning', msg: "Oops! Name field may not be blank." })
            else if (!email) return setAlert({ state: 'warning', msg: "Oops! Email field may not be blank." })
            else if (!password) return setAlert({ state: 'warning', msg: "Oops! Password field may not be blank." })
            else if (password !== confirm_password) return setAlert({ state: 'warning', msg: "Oops! Password field don't match." })

            const actionResult = await dispatch(authRegister({ name, email, password }))
            const registerStatus = unwrapResult(actionResult);
            if (registerStatus.errors) {
                setAlert({ state: 'error', msg: registerStatus })
            } else {
                setAlert({ state: 'success', msg: 'Registered successfully!"' })
            }
        } catch (err) {
            setAlert({ state: 'warning', msg: 'Oops! Failed to register.' })
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
                    <h1>Parkcuc / Register</h1>
                </Typography>
                <div className={classes.group}>
                    <TextField
                        className={classes.input}
                        label="Your Name"
                        variant="outlined"
                        name="name"
                        inputRef={register()}
                    />
                    <TextField
                        className={classes.input}
                        label="Username (optional)"
                        variant="outlined"
                        name="username"
                        inputRef={register()}
                    />
                </div>
                <TextField
                    className={classes.input}
                    label="Email"
                    variant="outlined"
                    name="email"
                    inputRef={register()}
                />
                <div className={classes.group}>
                    <TextField
                        className={classes.input}
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        inputRef={register()}
                    />
                    <TextField
                        className={classes.input}
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        name="confirm_password"
                        inputRef={register()}
                    />
                </div>
                <Link className={classes.link} to="/login">
                    <Typography>Already have an account? Login</Typography>
                </Link>
                <Button className={classes.button} type="submit">Register</Button>
            </Box>
        </form>
        </>
    )
}

export default Register