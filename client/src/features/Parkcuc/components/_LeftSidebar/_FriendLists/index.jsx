import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@material-ui/core'

import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone'
import ToysTwoToneIcon from '@material-ui/icons/ToysTwoTone'

import TabHeading from 'components/_TabHeading'
import TabHeadingSeach from 'components/_TabHeadingSearch'

import useStyles from './style'
import Loading from 'components/_Loading'


const FriendLists = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const f = useSelector(state => state.parkcuc)
    const [friendLists, setFriendLists] = useState()
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (friendLists) {
            setLoaded(true) 
        }
    }, [friendLists])

    useEffect(() => {
        fetchFriendLists()
    }, [])

    const fetchFriendLists = async () => {
        try {
            const actionResult = await dispatch(fetchFriendListsAPI({ limit: 20, offset: 0 }))
            const fetchStatus = unwrapResult(actionResult)
            setFriendLists(fetchStatus.data.fetchFriendLists)
        } catch (err) {
            console.log("Oops! Failed to fetchFriendLists.")
        }
    }

    const unfriend = async user_id => {
        try {
            await dispatch(unfriendAPI({ user_id }))
            fetchFriendLists()
        } catch (err) {
            console.log("Oops! Failed to unfriend.")
        } finally {
            setOpenDialog(false)
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
            {f.loading && <Loading />}
            {loaded && <>
            <TabHeading text={"My Friends"} subtext={`${friendLists.count} ${friendLists.count > 1 ? 'friends' : 'friend'}`}/>
            <TabHeadingSeach />
            <List className={`${classes.list} custom-scroll`}>
                {friendLists.data && friendLists.data.map(friend => 
                    <ListItem className={classes.listItem} key={friend._id}>
                        <ListItemAvatar>
                            <Avatar src={`${process.env.REACT_APP_BASE_URL}/image/${friend.avatar}`} alt={friend.name}/>
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
                            <IconButton edge="end" onClick={() => handleShowDialog(friend)}>
                                <Tooltip title="Delete" placement="bottom" arrow>
                                    <DeleteForeverTwoToneIcon />
                                </Tooltip>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
            </>}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Are you sure unfriend ${selectedUser ? selectedUser.name : ''}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action can not be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => unfriend(selectedUser._id)} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default FriendLists