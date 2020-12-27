import {
    Avatar,
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction, ListItemText
} from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import Loading from 'components/_Loading'
import TabHeading from 'components/_TabHeading'
import { deleteFriendRequestAPI, fetchSentRequestsAPI } from 'features/Parkcuc/parkcucSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './style'


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
        async function fetchSentRequests() {
            try {
                const actionResult = await dispatch(fetchSentRequestsAPI({ limit: 20, offset: 0 }))
                const fetchStatus = unwrapResult(actionResult)
                setSentRequests(fetchStatus.data.fetchSentRequests)
            } catch (err) {
                console.log("Oops! Failed to fetchSentRequests.")
            }
        }
        fetchSentRequests()
    }, [])

    const deleteFriendRequest = async user_id => {
        try {
            await dispatch(deleteFriendRequestAPI({ user_id }))
            document.getElementById(user_id).parentElement.remove()
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
            {f.loadingFetchSentRequests && <Loading />}
            {loaded && <>
            <TabHeading text={"Sent Requests"} subtext={`${sentRequests.count} sent ${sentRequests.count > 1 ? 'requests' : 'request'}`}/>
            <List className={`${classes.list} custom-scroll`}>
                {sentRequests.data && sentRequests.data.map(request => 
                <ListItem className={classes.listItem} key={request._id} id={request._id}>
                    <ListItemAvatar>
                        <Avatar src={`${process.env.REACT_APP_BASE_URL}/attachment/${request.avatar}`} alt={request.name}/>
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

export default SentRequests