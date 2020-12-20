import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { sendFriendRequestAPI } from 'features/Parkcuc/parkcucSlice'

import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Avatar,
    Typography,
    Tooltip,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@material-ui/core'

import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone'
import TextsmsTwoToneIcon from '@material-ui/icons/TextsmsTwoTone'

import TabHeading from 'components/_TabHeading'
import TabHeadingSeach from 'components/_TabHeadingSearch'

import useStyles from './style'


const FindFriend = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const f = useSelector(state => state.parkcuc)
    const [users, setUsers] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [add, setAdd] = useState(false)
    const [cancel, setCancel] = useState(false)

    useEffect(() => {
        if (f.findFriend) {
            setUsers(f.findFriend.data.findFriend)
        }
    })

    const sendFriendRequest = async user_id => {
        try {
            await dispatch(sendFriendRequestAPI({ user_id }))
            setCancel(true)
        } catch (err) {
            console.log("Oops! Failed to sendFriendRequest.")
        }
    }

    const handleShowDialog = user => {
        setOpenDialog(true)
        setSelectedUser(user)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    
    return (
        <>
            <TabHeading text={"Find Friend"} subtext={"Find more friends, more fun"}/>
            <TabHeadingSeach />
            <List className={`${classes.list} custom-scroll`}>
                {users && users.map(user => 
                <ListItem className={classes.listItem} alignItems="flex-start" key={user._id}>
                    <ListItemAvatar>
                        <Avatar src={`${process.env.REACT_APP_BASE_URL}/image/${user.avatar}`} alt={user.name} />
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
                        {user.status === "new" || add && 
                        <IconButton edge="end" className={classes.icon} onClick={() => sendFriendRequest(user._id)}>
                            <Tooltip title="Add friend" placement="bottom" arrow>
                                <PersonAddTwoToneIcon />
                            </Tooltip>
                        </IconButton>
                        }

                        {user.status === "sent" || cancel &&
                        <Tooltip title="Add friend" placement="bottom" arrow>
                            <Button color="secondary">Cancel</Button>
                        </Tooltip>
                        }

                        {user.status === "friend" &&
                        <IconButton edge="end" className={classes.icon}>
                            <Tooltip title="Add friend" placement="bottom" arrow>
                                <TextsmsTwoToneIcon />
                            </Tooltip>
                        </IconButton>
                        }
                    </ListItemSecondaryAction>
                </ListItem>
                )}
            </List>
            {/* <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Are you sure delete ${selectedUser ? selectedUser.name : ''} from sent requests ?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action can not be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => deleteFriendRequest(selectedUser._id)} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog> */}
        </>
    )
}

export default FindFriend