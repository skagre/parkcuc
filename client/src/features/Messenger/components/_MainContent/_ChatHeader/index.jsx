import React from 'react'

import VideocamTwoToneIcon from '@material-ui/icons/VideocamTwoTone'
import CallTwoToneIcon from '@material-ui/icons/CallTwoTone'
import MoreVertTwoToneIcon from '@material-ui/icons/MoreVertTwoTone'
import TuneTwoToneIcon from '@material-ui/icons/TuneTwoTone'

import useStyles from './style';
import { Avatar, Typography } from '@material-ui/core'


const ChatHeader = props => {
    const classes = useStyles()
    return (
        <div className={classes.chatHeader}>
            <Avatar 
                className={classes.avatar}
                alt="Bac"
                src="https://material-ui.com/static/images/avatar/1.jpg"
            />
            <div className={classes.info}>
                <Typography>Xuân Bắc</Typography>
                <Typography>Active 20m ago</Typography>
            </div>
            <div className={classes.iconGroup}>
                <CallTwoToneIcon className={classes.icon} />
                <VideocamTwoToneIcon className={classes.icon} />
                <MoreVertTwoToneIcon className={classes.icon} />
                <TuneTwoToneIcon className={classes.icon} />
            </div>
        </div>
    )
}

export default ChatHeader