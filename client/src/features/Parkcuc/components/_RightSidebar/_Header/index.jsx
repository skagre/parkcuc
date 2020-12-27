import React from 'react'

import CallTwoToneIcon from '@material-ui/icons/CallTwoTone'
import VideocamTwoToneIcon from '@material-ui/icons/VideocamTwoTone'
import NotificationsOffTwoToneIcon from '@material-ui/icons/NotificationsOffTwoTone'

import useStyles from './style';
import { Avatar, Typography } from '@material-ui/core';


const Header = props => {
    const classes = useStyles()
    return (
        <div className={classes.headerWrap}>
            <Avatar 
                className={classes.avatar}
                src={`${process.env.REACT_APP_BASE_URL}/attachment/${props.ConversationInfo.avatar}`} 
                alt={props.ConversationInfo.name}/>
            <Typography className={classes.text}>{props.ConversationInfo.name}</Typography>
            <Typography className={classes.text}>Active</Typography>
            <div className={classes.iconGroup}>
                <CallTwoToneIcon className={classes.icon} />
                <VideocamTwoToneIcon className={classes.icon} />
                <NotificationsOffTwoToneIcon className={classes.icon} />
            </div>
        </div>
    );
}

export default Header