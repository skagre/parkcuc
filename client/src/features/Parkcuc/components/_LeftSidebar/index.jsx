import {
    Avatar,
    Badge, Tab, Tabs,
    Tooltip
} from '@material-ui/core'
import HowToRegTwoToneIcon from '@material-ui/icons/HowToRegTwoTone'
import NotificationsTwoToneIcon from '@material-ui/icons/NotificationsTwoTone'
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone'
import RecordVoiceOverTwoToneIcon from '@material-ui/icons/RecordVoiceOverTwoTone'
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone'
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone'
import SmsTwoToneIcon from '@material-ui/icons/SmsTwoTone'
import PowerSettingsNewTwoToneIcon from '@material-ui/icons/PowerSettingsNewTwoTone'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import useStyles from './style'
import FindFriend from './_FindFriend'
import FriendLists from './_FriendLists'
import Notifications from './_Notifications'
import PendingRequests from './_PendingRequests'
import Profile from './_Profile'
import RecentChat from './_RecentChat'
import SentRequests from './_SentRequests'

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
                <Tooltip title="Friends" placement="right" arrow>
                    <Tab className={classes.tab} icon={<PeopleAltTwoToneIcon className={classes.icon} />} {...a11yProps(2)} />
                </Tooltip>
                <Tooltip title="Sent Requests" placement="right" arrow>
                    <Tab className={classes.tab} icon={<HowToRegTwoToneIcon className={classes.icon} />} {...a11yProps(3)} />
                </Tooltip>
                <Tooltip title="Pending Requests" placement="right" arrow>
                    <Tab className={classes.tab} icon={<RecordVoiceOverTwoToneIcon className={classes.icon} />} {...a11yProps(4)} />
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
                <Tooltip title="Find Friends" placement="right" arrow>
                    <Tab className={classes.tab} icon={<SearchTwoToneIcon className={classes.icon} />} {...a11yProps(6)} />
                </Tooltip>
            </Tabs>
            <TabPanel value={value} index={0}>
                <Profile />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <RecentChat />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <FriendLists />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <SentRequests />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <PendingRequests />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Notifications />
            </TabPanel>
            <TabPanel value={value} index={6}>
                <FindFriend />
            </TabPanel>
        </>
    )
}

export default LeftSidebar