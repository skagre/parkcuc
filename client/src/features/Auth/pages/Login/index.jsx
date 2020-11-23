import React from 'react'

import {useForm} from 'react-hook-form'

import {Link} from 'react-router-dom'

import {
    Box, 
    Button,
    TextField, 
    Typography
} from '@material-ui/core'

import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined'

import useStyles from './style'
import { SpaRounded } from '@material-ui/icons'


const Login = props => {
    const classes = useStyles()
    const { register, handleSubmit, errors } = useForm()
    
    const onSubmit = data => {
        console.log(data)
    }

    return (
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
    )
}

export default Login