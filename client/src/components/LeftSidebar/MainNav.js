import React from 'react'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import PeopleIcon from '@material-ui/icons/People'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import SettingsIcon from '@material-ui/icons/Settings'


import './MainNav.css'
const MainNav = props => {
    return (
        <MenuList className="b__main-nav">
            <MenuItem><GroupAddIcon /></MenuItem>
            <MenuItem><PeopleIcon /></MenuItem>
            <MenuItem><RecordVoiceOverIcon /></MenuItem>
            <MenuItem><SettingsIcon /></MenuItem>
        </MenuList>
    )
}

export default MainNav