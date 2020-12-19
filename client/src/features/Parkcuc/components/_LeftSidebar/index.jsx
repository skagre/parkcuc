import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
    Tabs,
    Tab,
    Avatar,
    Tooltip,
    Badge
} from '@material-ui/core'

import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone'
import HowToRegTwoToneIcon from '@material-ui/icons/HowToRegTwoTone'
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone'
import RecordVoiceOverTwoToneIcon from '@material-ui/icons/RecordVoiceOverTwoTone'
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone'
import SmsTwoToneIcon from '@material-ui/icons/SmsTwoTone'
import NotificationsTwoToneIcon from '@material-ui/icons/NotificationsTwoTone'

import FriendLists from './_FriendLists'
import Notifications from './_Notifications'
import RecentChat from './_RecentChat'
import SentRequests from './_SentRequests'
import Profile from './_Profile'

import useStyles from './style'


const TabPanel = props => {
    const { children, value, index, ...other } = props
    const classes = useStyles()

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            className={classes.tabPanel}
            {...other}
        >
        {value === index && (
            <>
                {children}
            </>
        )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

const a11yProps = index => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const LeftSidebar = props => {
    const classes = useStyles();
    const [value, setValue] = useState(1)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                className={classes.tabs}
            >
                <Tooltip title="Profile" placement="right" arrow>
                    <Tab className={classes.tab} icon={<Avatar src="" alt="avatar"/>} {...a11yProps(0)} />
                </Tooltip>
                <Tooltip title="Recent Chat" placement="right" arrow>
                    <Tab className={classes.tab} icon={<SmsTwoToneIcon className={classes.icon} />} {...a11yProps(1)} />
                </Tooltip>
                <Tooltip title="Friends Online" placement="right" arrow>
                    <Tab className={classes.tab} icon={<RecordVoiceOverTwoToneIcon className={classes.icon} />} {...a11yProps(2)} />
                </Tooltip>
                <Tooltip title="Friends" placement="right" arrow>
                    <Tab className={classes.tab} icon={<PeopleAltTwoToneIcon className={classes.icon} />} {...a11yProps(3)} />
                </Tooltip>
                <Tooltip title="Sent Requests" placement="right" arrow>
                    <Tab className={classes.tab} icon={<HowToRegTwoToneIcon className={classes.icon} />} {...a11yProps(4)} />
                </Tooltip>
                <Tooltip title="Notifications" placement="right" arrow>
                    <Tab 
                        className={classes.tab} 
                        icon={
                            <Badge badgeContent={2} max={99} color="secondary">
                                <NotificationsTwoToneIcon className={classes.icon} />
                            </Badge>
                        } 
                        {...a11yProps(5)} 
                    />
                </Tooltip>
                <Tooltip title="Dark Mode" placement="right" arrow>
                    <Tab className={classes.tab} icon={<Brightness4TwoToneIcon className={classes.icon} />} {...a11yProps(6)} />
                </Tooltip>
                <Tooltip title="Settings" placement="right" arrow>
                    <Tab className={classes.tab} icon={<SettingsTwoToneIcon className={classes.icon} />} {...a11yProps(7)} />
                </Tooltip>
            </Tabs>
            <TabPanel value={value} index={0}>
                <Profile />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <RecentChat />
            </TabPanel>
            <TabPanel value={value} index={2}>
                Friends Online
            </TabPanel>
            <TabPanel value={value} index={3}>
                <FriendLists />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <SentRequests />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Notifications />
            </TabPanel>
            <TabPanel value={value} index={6}>
                Darkmode
            </TabPanel>
            <TabPanel value={value} index={7}>
                Settings
            </TabPanel>
        </>
    )
}

export default LeftSidebar