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
import { activeConversationInfo, fetchConversationListsAPI } from 'features/Parkcuc/parkcucSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import useStyles from './style'


let socket
socket = io(process.env.REACT_APP_SOCKET_IO)
const RecentChat = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const f = useSelector(state => state.parkcuc)
    const [recentChat, setRecentChat] = useState([])
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

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

    useEffect(() => {
        if (f.activeConversationID) {
            socket.emit('join', f.activeConversationID)
        }
    }, [process.env.REACT_APP_SOCKET_IO, f.activeConversationID])

    useEffect(() => {
        socket.on('lastMessage', params => {
            try {
                if (params.message.attachments.length > 0) {
                    if (params.message.sender === userInfo._id) {
                        document.getElementById(`msg-${f.activeConversationID}`).innerHTML = `You sent ${params.message.attachments.length === 1 ? 'attachment' : 'attachments'}`
                    } else {
                        document.getElementById(`msg-${f.activeConversationID}`).innerHTML = `${f.activeConversationInfo.name} sent ${params.message.attachments.length === 1 ? 'attachment' : 'attachments'}`
                    }
                } else {
                    if (params.message.sender === userInfo._id) {
                        document.getElementById(`msg-${f.activeConversationID}`).innerHTML = `You: ${params.message.body}`
                    } else {
                        document.getElementById(`msg-${f.activeConversationID}`).innerHTML = params.message.body
                    }
                }
            } catch {}
        })
    }, [f.newMessage])
    
    const setActiveConversationInfo = user => {
        dispatch(activeConversationInfo(user))
    }
    
    return (
        <>
            <TabHeading text={"Recent Chat"} subtext={"Start New Conversation"}/>
            <TabHeadingSeach />
            <List className={`${classes.list} custom-scroll`}>
                {recentChat && recentChat.map(rc => 
                    rc.conversation &&
                    <ListItem className={classes.listItem} alignItems="flex-start" key={rc.conversation._id} onClick={() => setActiveConversationInfo(rc.conversation.contact)}>
                        <ListItemAvatar>
                            {rc.conversation.conversation_type === 'chat' 
                            ? 
                            <Avatar src={`${process.env.REACT_APP_BASE_URL}/attachment/${rc.conversation.contact.avatar}`} alt={rc.conversation.contact.name}/>
                            :
                            <Avatar />
                            }
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography
                                    className={classes.text}
                                    noWrap
                                >
                                {rc.conversation.name ? rc.conversation.name : rc.conversation.contact.name}
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    className={classes.text}
                                    variant="body2"
                                    noWrap
                                    id={`msg-${rc.conversation._id}`}
                                >
                                { rc.lastMessage &&
                                    rc.lastMessage.attachments.length > 0 
                                    ? 
                                        userInfo._id === rc.lastMessage.sender
                                        ?
                                        `You sent ${rc.lastMessage.attachments.length === 1 ? `${rc.lastMessage.attachments.length} attachment` : `${rc.lastMessage.attachments.length} attachments`}`
                                        :
                                        `${rc.conversation.name ? rc.conversation.name : rc.conversation.contact.name} sent ${rc.lastMessage.attachments.length === 1 ? `${rc.lastMessage.attachments.length} attachment` : `${rc.lastMessage.attachments.length} attachments`}`
                                    :
                                        userInfo._id === rc.lastMessage.sender
                                        ?
                                        `You: ${rc.lastMessage.body}`
                                        :
                                        rc.lastMessage.body
                                }
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