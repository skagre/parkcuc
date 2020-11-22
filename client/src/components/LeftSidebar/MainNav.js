import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Contacts from './Contacts'
import Notification from './Notifications'

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'

import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone'
import NotificationsTwoToneIcon from '@material-ui/icons/NotificationsTwoTone'
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone'
import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone'
import RecordVoiceOverTwoToneIcon from '@material-ui/icons/RecordVoiceOverTwoTone'
import SmsTwoToneIcon from '@material-ui/icons/SmsTwoTone'

import { green } from '@material-ui/core/colors'
import Friends from './Friends'


const TabPanel = props => {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{width: 'calc(100% - 70px)'}}
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

const theme = createMuiTheme({
    overrides: {
        MuiTabs: {
            root: {
                width: 70,
                height: '100vh',
                overflow: 'unset !important',
                borderRight: '1px solid #00000015'
            }
        },
        MuiTab: {
            root: {
                minWidth: 0,
                padding: '18px 12px',
                '@media (min-width: 600px)': {
                    minWidth: 0
                }
            }
        },
        MuiSvgIcon: {
            root: {
                fontSize: 28,
                color: green[600],
            }
        }
    }
})

const useStyles = makeStyles((theme) => ({
    indicator: {
        color: 'red'
    }
}))

const MainNav = props => {

    const classes = useStyles();
    const [value, setValue] = useState(1)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <ThemeProvider theme={theme}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                classes={{indicator: classes.indicator}}
            >
                <Tooltip title="Profile" placement="right" arrow>
                    <Tab icon={<Avatar>B</Avatar>} {...a11yProps(0)} />
                </Tooltip>
                <Tooltip title="Friends Online" placement="right" arrow>
                    <Tab icon={<SmsTwoToneIcon />} {...a11yProps(1)} />
                </Tooltip>
                <Tooltip title="Friends Online" placement="right" arrow>
                    <Tab icon={<RecordVoiceOverTwoToneIcon />} {...a11yProps(1)} />
                </Tooltip>
                <Tooltip title="Friends" placement="right" arrow>
                    <Tab icon={<PeopleAltTwoToneIcon />} {...a11yProps(2)} />
                </Tooltip>
                <Tooltip title="Notification" placement="right" arrow>
                    <Tab 
                        icon={
                            <Badge badgeContent={2} max={99} color="secondary">
                                <NotificationsTwoToneIcon />
                            </Badge>
                        } 
                        {...a11yProps(3)} 
                    />
                </Tooltip>
                <Tooltip title="Dark Mode" placement="right" arrow>
                    <Tab icon={<Brightness4TwoToneIcon />} {...a11yProps(4)} />
                </Tooltip>
                <Tooltip title="Setting" placement="right" arrow>
                    <Tab icon={<SettingsTwoToneIcon />} {...a11yProps(5)} />
                </Tooltip>
            </Tabs>
            <TabPanel value={value} index={0}>
                Profile
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Contacts />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Friends />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Friends />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Notification />
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
        </ThemeProvider>
    )
}

export default MainNav