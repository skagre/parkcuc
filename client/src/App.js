import React from 'react';
import MainNav from './components/LeftSidebar/MainNav'
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PeopleIcon from '@material-ui/icons/People';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import SettingsIcon from '@material-ui/icons/Settings';


export default function CustomizedMenus() {
    return (
        <Grid className="b__container" container>
            <MainNav />
        </Grid>
    );
}