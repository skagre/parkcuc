import {
    Avatar,
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction, ListItemText,
    Typography,
    Box
} from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import Loading from 'components/_Loading'
import TabHeading from 'components/_TabHeading'
import { deleteFriendRequestAPI, fetchPendingRequestsAPI, acceptFriendRequestAPI } from 'features/Parkcuc/parkcucSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './style'


const PendingRequests = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const f = useSelector(state => state.parkcuc)
    const [pendingRequests, setPendingRequests] = useState()
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (pendingRequests) {
            setLoaded(true) 
        }
    }, [pendingRequests])

    useEffect(() => {
        async function fetchPendingRequests() {
            try {
                const actionResult = await dispatch(fetchPendingRequestsAPI({ limit: 20, offset: 0 }))
                const fetchStatus = unwrapResult(actionResult)
                setPendingRequests(fetchStatus.data.fetchPendingRequests)
            } catch (err) {
                console.log("Oops! Failed to fetchSentRequests.")
            }
        }
        fetchPendingRequests()
    }, [])

    const acceptFriendRequest = async user_id => {
        try {
            await dispatch(acceptFriendRequestAPI({ user_id }))
            document.getElementById(user_id).remove()
        } catch (err) {
            console.log("Oops! Failed to acceptFriendRequest.")
        } finally {
            setOpenDialog(false)
        }
    } 

    const deleteFriendRequest = async user_id => {
        try {
            await dispatch(deleteFriendRequestAPI({ user_id }))
            document.getElementById(user_id).remove()
        } catch (err) {
            console.log("Oops! Failed to deleteFriendRequest.")
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
            {f.loadingFetchPendingRequests && <Loading />}
            {loaded && <>
            <TabHeading text={"Pending Requests"} subtext={`${pendingRequests.count} pending ${pendingRequests.count > 1 ? 'requests' : 'request'}`}/>
            <List className={`${classes.list} custom-scroll`}>
                {pendingRequests.data && pendingRequests.data.map(request =>
                <ListItem className={classes.listItem} key={request._id} id={request._id}>
                    <ListItemAvatar>
                        <Avatar src={`${process.env.REACT_APP_BASE_URL}/attachment/${request.avatar}`} alt={request.name}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={request.name}
                        secondary="sent you a friend request."
                    />
                    <Typography variant="body2">1d ago</Typography>
                    <Box className={classes.box}>
                        <Button variant="outlined" onClick={() => acceptFriendRequest(request._id)}>Accept</Button>
                        <Button variant="outlined" onClick={() => handleShowDialog(request)}>Cancel</Button>
                    </Box>
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
                <DialogTitle id="alert-dialog-title">{`Are you sure delete ${selectedUser ? selectedUser.name : ''} from pending requests ?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action can not be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={() => deleteFriendRequest(selectedUser._id)} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PendingRequests