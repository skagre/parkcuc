import { Avatar, Typography } from '@material-ui/core'
import CallTwoToneIcon from '@material-ui/icons/CallTwoTone'
import MoreVertTwoToneIcon from '@material-ui/icons/MoreVertTwoTone'
import TuneTwoToneIcon from '@material-ui/icons/TuneTwoTone'
import VideocamTwoToneIcon from '@material-ui/icons/VideocamTwoTone'
import React, { useEffect, useState } from 'react'
import useStyles from './style'


const ChatHeader = props => {
    const classes = useStyles()
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        if (toggle) 
            document.getElementById("rightSidebar").style.display = 'none'
        else
            document.getElementById("rightSidebar").style.display = 'block'
    })

    const toggleSidebar = () => {
        setToggle(!toggle)
    }

    return (
        <div className={classes.chatHeader}>
            <Avatar 
                className={classes.avatar}
                src={`${process.env.REACT_APP_BASE_URL}/attachment/${props.userInfo.avatar}`} 
                alt={props.userInfo.name}/>
            <div className={classes.info}>
                <Typography>{props.userInfo.name}</Typography>
                <Typography>Active 20m ago</Typography>
            </div>
            <div className={classes.iconGroup}>
                <CallTwoToneIcon className={classes.icon} />
                <VideocamTwoToneIcon className={classes.icon} />
                <MoreVertTwoToneIcon className={classes.icon} />
                <TuneTwoToneIcon className={classes.icon} onClick={() => toggleSidebar()}/>
            </div>
        </div>
    )
}

export default ChatHeader