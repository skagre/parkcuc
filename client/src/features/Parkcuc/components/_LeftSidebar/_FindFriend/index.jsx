import {
    Avatar,
    Button, IconButton, List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction, ListItemText,
    Tooltip, Typography
} from '@material-ui/core'
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone'
import TextsmsTwoToneIcon from '@material-ui/icons/TextsmsTwoTone'
import TabHeading from 'components/_TabHeading'
import TabHeadingSeach from 'components/_TabHeadingSearch'
import { deleteFriendRequestAPI, sendFriendRequestAPI } from 'features/Parkcuc/parkcucSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './style'

const FindFriend = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const f = useSelector(state => state.parkcuc)
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (f.findFriend) {
            setUsers(f.findFriend.data.findFriend)
        }
    })

    const sendFriendRequest = async user_id => {
        try {
            await dispatch(sendFriendRequestAPI({ user_id }))
            document.getElementById(`add-${user_id}`).style.display = 'none'
            document.getElementById(`cancel-${user_id}`).style.display = 'block'
        } catch (err) {
            console.log("Oops! Failed to sendFriendRequest.")
        }
    }

    const deleteFriendRequest = async user_id => {
        try {
            await dispatch(deleteFriendRequestAPI({ user_id }))
            document.getElementById(`add-${user_id}`).style.display = 'block'
            document.getElementById(`cancel-${user_id}`).style.display = 'none'
        } catch (err) {
            console.log("Oops! Failed to deleteFriendRequest.")
        }
    }
    
    return (
        <>
            <TabHeading text={"Find Friend"} subtext={"Find more friends, more fun"}/>
            <TabHeadingSeach />
            <List className={`${classes.list} custom-scroll`}>
                {users && users.map(user => 
                <ListItem className={classes.listItem} alignItems="flex-start" key={user._id}>
                    <ListItemAvatar>
                        <Avatar src={`${process.env.REACT_APP_BASE_URL}/attachment/${user.avatar}`} alt={user.name} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography
                                className={classes.text}
                                noWrap
                            >
                            {user.name}
                            </Typography>
                        }
                        secondary={
                            <Typography
                                className={classes.text}
                                variant="body2"
                                noWrap
                            >
                            Send a friend request to <strong>{user.name}</strong>
                            </Typography >
                    }
                    />
                    <ListItemSecondaryAction>
                        {user.status === "new" && <>
                        <IconButton 
                            edge="end" 
                            className={classes.icon} 
                            onClick={() => sendFriendRequest(user._id)}
                            id={`add-${user._id}`}>
                            <Tooltip title="Add friend" placement="bottom" arrow>
                                <PersonAddTwoToneIcon />
                            </Tooltip>
                        </IconButton>
                        <Tooltip title="Cancel" placement="bottom" arrow>
                            <Button 
                            color="secondary" 
                            onClick={() => deleteFriendRequest(user._id)}
                            id={`cancel-${user._id}`}
                            style={{display: 'none'}}>Cancel</Button>
                        </Tooltip>
                        </>}

                        {user.status === "sent" && <>
                        <Tooltip title="Cancel" placement="bottom" arrow>
                            <Button 
                                color="secondary" 
                                onClick={() => deleteFriendRequest(user._id)}
                                id={`cancel-${user._id}`}>Cancel</Button>
                        </Tooltip>
                        <IconButton 
                            edge="end" 
                            className={classes.icon} 
                            onClick={() => sendFriendRequest(user._id)}
                            id={`add-${user._id}`} 
                            style={{display: 'none'}}>
                            <Tooltip title="Add friend" placement="bottom" arrow>
                                <PersonAddTwoToneIcon />
                            </Tooltip>
                        </IconButton>
                        </>}

                        {user.status === "friend" &&
                        <IconButton edge="end" className={classes.icon}>
                            <Tooltip title="Chat" placement="bottom" arrow>
                                <TextsmsTwoToneIcon />
                            </Tooltip>
                        </IconButton>
                        }
                    </ListItemSecondaryAction>
                </ListItem>
                )}
            </List>
        </>
    )
}

export default FindFriend