import {
    Avatar,
    IconButton, List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction, ListItemText,
    Tooltip, Typography
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { unwrapResult } from '@reduxjs/toolkit'
import TabHeading from 'components/_TabHeading'
import TabHeadingSeach from 'components/_TabHeadingSearch'
import { fetchConversationListsAPI } from 'features/Parkcuc/parkcucSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useStyles from './style'


const RecentChat = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [recentChat, setRecentChat] = useState([])

    useEffect(() => {
        async function fetchConversationLists() {
            try {
                const actionResult = await dispatch(fetchConversationListsAPI({ limit: 20, offset: 0 }))
                const fetchStatus = unwrapResult(actionResult)
                setRecentChat(fetchStatus.data.fetchConversationLists)
            } catch (err) {
                console.log("Oops! Failed to fetchConversationLists.")
            }
        }
        fetchConversationLists()
    }, [])
    
    return (
        <>
            <TabHeading text={"Recent Chat"} subtext={"Start New Conversation"}/>
            <TabHeadingSeach />
            <List className={`${classes.list} custom-scroll`}>
                {recentChat && recentChat.map(rc => 
                <ListItem className={classes.listItem} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar src={rc.participants[1].name} alt={rc.participants[1].name} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography
                                className={classes.text}
                                noWrap
                            >
                            {rc.participants[1].name}
                            </Typography>
                        }
                        secondary={
                            <Typography
                                className={classes.text}
                                variant="body2"
                                noWrap
                            >
                                I'll be in your neighborhood doing errasdasd asdasdasdasdasdas
                            </Typography >
                    }
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" className={classes.icon}>
                            <Tooltip title="Action" placement="bottom" arrow>
                                <MoreVertIcon />
                            </Tooltip>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                )}
            </List>
        </>
    )
}

export default RecentChat