import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'

import useStyles from './style'

import LeftSidebar from './components/_LeftSidebar'
import MainContent from './components/_MainContent'
import RightSidebar from './components/_RightSidebar'


const Parkcuc = props => {
    const classes = useStyles()

    return (
        <Grid container className={classes.container}>
            <Grid item className={classes.leftSidebar}>
                <LeftSidebar />
            </Grid>
            <Grid item className={classes.mainContent}>
                <MainContent />
            </Grid>
            <Grid item className={classes.rightSidebar} id="rightSidebar">
                <RightSidebar />
            </Grid>
        </Grid>
    )
}

export default Parkcuc