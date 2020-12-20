import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { fetchSentRequestsAPI, deleteFriendRequestAPI } from 'features/Parkcuc/parkcucSlice'

import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@material-ui/core'

import TabHeading from 'components/_TabHeading'

import useStyles from './style'
import Loading from 'components/_Loading'


const SentRequests = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const f = useSelector(state => state.parkcuc)
    const [sentRequests, setSentRequests] = useState()
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (sentRequests) {
            setLoaded(true) 
        }
    }, [sentRequests])

    useEffect(() => {
        fetchSentRequests()
    }, [])

    const fetchSentRequests = async () => {
        try {
            const actionResult = await dispatch(fetchSentRequestsAPI({ limit: 20, offset: 0 }))
            const fetchStatus = unwrapResult(actionResult)
            setSentRequests(fetchStatus.data.fetchSentRequests)
        } catch (err) {
            console.log("Oops! Failed to fetchSentRequests.")
        }
    }

    const deleteFriendRequest = async user_id => {
        try {
            await dispatch(deleteFriendRequestAPI({ user_id }))
            fetchSentRequests()
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
            <TabHeading text={"Sent Requests"} subtext={`${sentRequests.count} sent ${sentRequests.count > 1 ? 'requests' : 'request'}`}/>
            <List className={`${classes.list} custom-scroll`}>
                {sentRequests.data && sentRequests.data.map(request => 
                <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar src={`${process.env.REACT_APP_BASE_URL}/image/${request.avatar}`} alt={request.name}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={request.name}
                        secondary="Sent 3d ago"
                    />
                    <ListItemSecondaryAction>
                        <Button color="secondary" onClick={() => handleShowDialog(request)}>Cancel</Button>
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
            </Dialog>
        </>
    )
}

export default SentRequests