import React from 'react';
import MainNav from '../components/LeftSidebar/MainNav'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Friends from '../components/LeftSidebar/Friends'


const useStyles = makeStyles({
    leftSidebar: {
        minWidth: '300px',
        maxWidth: '480px',
        flexBasis: '27%',
        display: 'flex'
    },
    mainContent: {
        flex: 1,
        backgroundColor: 'green'
    },
    rightSidebar: {
        minWidth: '280px',
        maxWidth: '360px',
        flexBasis: '23%',
        backgroundColor: 'blue'
    }
})

const Messenger = props => {
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item className={classes.leftSidebar}>
                <MainNav />
            </Grid>
            <Grid item className={classes.mainContent}>
                <Friends />
            </Grid>
            <Grid item className={classes.rightSidebar}>

            </Grid>
        </Grid>
    );
}

export default Messenger