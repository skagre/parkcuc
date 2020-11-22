import React from 'react'

import {Link} from "react-router-dom";

import {
    Box, 
    Button, 
    Container, 
    TextField, 
    Typography
} from '@material-ui/core'

import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined'

import useStyles from './style'


const Login = props => {
    const classes = useStyles()
    return (
        <Container className={classes.container}>
        <Box className={classes.box}>
            <Typography className={classes.icon}>
                <TextsmsOutlinedIcon />
                <h1>Parkcuc / Login</h1>
            </Typography>
            <TextField
                className={classes.input}
                label="Email Or Something"
                required
                variant="outlined"
            />
            <TextField
                className={classes.input}
                label="Password"
                type="password"
                required
                variant="outlined"
            />
            <Link className={classes.link} to="/register">
                <Typography>Don't have an account? Register</Typography>
            </Link>
            <Button className={classes.button}>Login</Button>
        </Box>
        </Container>
    )
}

export default Login