import React from 'react';
import MainNav from './components/LeftSidebar/MainNav'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PeopleIcon from '@material-ui/icons/People';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import SettingsIcon from '@material-ui/icons/Settings';


const useStyles = makeStyles({
    leftSidebar: {
        minWidth: '300px',
        maxWidth: '480px',
        flexBasis: '25%',
        backgroundColor: 'red'
    },
    mainContent: {
        flex: 1,
        backgroundColor: 'green'
    },
    rightSidebar: {
        minWidth: '280px',
        maxWidth: '360px',
        flexBasis: '25%',
        backgroundColor: 'blue'
    }
})

const App = props => {

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

export default App