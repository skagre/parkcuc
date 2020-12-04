import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import useStyles from './style'

import LeftSidebar from './components/LeftSidebar'


const Messenger = props => {
    const auth = useSelector(state => state.auth)
    console.log(auth)
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item className={classes.leftSidebar}>
                <LeftSidebar />
            </Grid>
            <Grid item className={classes.mainContent}>
                
            </Grid>
            <Grid item className={classes.rightSidebar}>

            </Grid>
        </Grid>
    )
}

export default Messenger