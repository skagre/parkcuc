import React from 'react';
import MainNav from 'components/LeftSidebar/MainNav'
import Grid from '@material-ui/core/Grid';

import useStyles from './style'


const Messenger = props => {
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item className={classes.leftSidebar}>
                <MainNav />
            </Grid>
            <Grid item className={classes.mainContent}>
                
            </Grid>
            <Grid item className={classes.rightSidebar}>

            </Grid>
        </Grid>
    );
}

export default Messenger