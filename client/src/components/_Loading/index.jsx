import React from 'react'
import {
    Backdrop,
    CircularProgress
} from '@material-ui/core'

import useStyles from './style'


const Loading = props => {
    const classes = useStyles()
    return (
        <Backdrop className={classes.backdrop} open>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loading