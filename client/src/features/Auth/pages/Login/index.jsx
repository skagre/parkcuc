import React from 'react'
import {useDispatch} from 'react-redux'

import {useForm} from 'react-hook-form'

import {Link, useHistory} from 'react-router-dom'

import {
    Box, 
    Button,
    TextField, 
    Typography,
    Backdrop,
    CircularProgress
} from '@material-ui/core'

import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined'

import useStyles from './style'


const Login = props => {
    const classes = useStyles()
    const { register, handleSubmit, errors, formState: { isSubmitting } } = useForm()
    const history = useHistory()
    const dispatch = useDispatch()
    
    const onSubmit = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                history.push('/')
                resolve(true)
            }, 2000)
        })
    }

    return (
        <>
        {isSubmitting && 
            <Backdrop className={classes.backdrop} open>
                <CircularProgress color="inherit" />
            </Backdrop>
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
                    name="email"
                    inputRef={register({ required: "Oops! This field may not be blank." })}
                />
                {errors.email && <span>{errors.email.message}</span>}
                <TextField
                    className={classes.input}
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    inputRef={register({ required: "Oops! This field may not be blank." })}
                />
                {errors.password && <span>{errors.password.message}</span>}
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