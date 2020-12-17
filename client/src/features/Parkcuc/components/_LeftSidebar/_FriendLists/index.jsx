import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { fetchFriendListsAPI, unfriendAPI } from 'features/Parkcuc/parkcucSlice'

import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Avatar,
    IconButton,
    Tooltip
} from '@material-ui/core'

import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone'
import ToysTwoToneIcon from '@material-ui/icons/ToysTwoTone'

import TabHeading from 'components/_TabHeading'
import TabHeadingSeach from 'components/_TabHeadingSearch'

import useStyles from './style'


const FriendLists = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [friendLists, setFriendLists] = useState([])

    useEffect(() => {
        async function fetchFriendLists() {
            try {
                const actionResult = await dispatch(fetchFriendListsAPI({ limit: 20, offset: 0 }))
                const fetchStatus = unwrapResult(actionResult)
                setFriendLists(fetchStatus.data.fetchFriendLists)
            } catch (err) {
                console.log("Oops! Failed to fetchFriendLists.")
            }
        }
        fetchFriendLists()
    }, [])

    const unfriend = async user_id => {
        try {
            await dispatch(unfriendAPI({ user_id }))
        } catch (err) {
            console.log("Oops! Failed to unfriend.")
        }
    } 

    return (
        <>
            <TabHeading text={"My Friends"} subtext={"136 friends"}/>
            <TabHeadingSeach />
            <List className={`${classes.list} custom-scroll`}>
                {friendLists && friendLists.map(friend => 
                    <ListItem className={classes.listItem} key={friend._id}>
                        <ListItemAvatar>
                            <Avatar src={friend.name} alt={friend.name}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={friend.name}
                            secondary="Active 30m ago"
                        />
                        <ListItemSecondaryAction>
                            <IconButton>
                                <Tooltip title="Wave" placement="bottom" arrow>
                                    <ToysTwoToneIcon />
                                </Tooltip>
                            </IconButton>
                            <IconButton edge="end" onClick={() => unfriend(friend._id)}>
                                <Tooltip title="Delete" placement="bottom" arrow>
                                    <DeleteForeverTwoToneIcon />
                                </Tooltip>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
        </>
    )
}

export default FriendLists