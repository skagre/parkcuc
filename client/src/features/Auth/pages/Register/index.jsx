import React from 'react'

import {useForm} from 'react-hook-form'

import {Link} from 'react-router-dom'

import {
    Box, 
    Button, 
    Container, 
    TextField, 
    Typography
} from '@material-ui/core'

import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined'

import useStyles from './style'


const Register = props => {
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
                    <h1>Parkcuc / Register</h1>
                </Typography>
                <div className={classes.group}>
                    <TextField
                        className={classes.input}
                        label="Your Name"
                        variant="outlined"
                        name="name"
                        inputRef={register({ required: "Oops! This field may not be blank." })}
                    />
                    <TextField
                        className={classes.input}
                        label="Username (optional)"
                        variant="outlined"
                    />
                </div>
                <TextField
                    className={classes.input}
                    label="Email Or Something"
                    variant="outlined"
                    name="email"
                    inputRef={register({ required: "Oops! This field may not be blank." })}
                />
                <div className={classes.group}>
                    <TextField
                        className={classes.input}
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        inputRef={register({ required: "Oops! This field may not be blank." })}
                    />
                    <TextField
                        className={classes.input}
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        name="confirm-password"
                        inputRef={register({ required: "Oops! This field may not be blank." })}
                    />
                </div>
                <Link className={classes.link} to="/login">
                    <Typography>Already have an account? Login</Typography>
                </Link>
                <Button className={classes.button} type="submit">Register</Button>
            </Box>
        </form>
    )
}

export default Register