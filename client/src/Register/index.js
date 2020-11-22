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


const Register = props => {
    const classes = useStyles()
    return (
        <Container className={classes.container}>
            <Box className={classes.box}>
                <Typography className={classes.icon}>
                    <TextsmsOutlinedIcon />
                    <h1>Parkcuc / Register</h1>
                </Typography>
                <div className={classes.group}>
                    <TextField
                        className={classes.input}
                        label="Your Name"
                        required
                        variant="outlined"
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
                    required
                    variant="outlined"
                />
                <div className={classes.group}>
                    <TextField
                        className={classes.input}
                        label="Password"
                        type="password"
                        required
                        variant="outlined"
                    />
                    <TextField
                        className={classes.input}
                        label="Confirm Password"
                        type="password"
                        required
                        variant="outlined"
                    />
                </div>
                <Link className={classes.link} to="/login">
                    <Typography>Already have an account? Login</Typography>
                </Link>
                <Button className={classes.button}>Register</Button>
            </Box>
        </Container>
    )
}

export default Register