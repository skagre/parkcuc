import {
    Avatar,
    LinearProgress,
    List, ListItem, ListItemIcon, ListItemText, ListSubheader, Snackbar, Typography
} from '@material-ui/core'
import AddAPhotoTwoToneIcon from '@material-ui/icons/AddAPhotoTwoTone'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone'
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone'
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone'
import PowerSettingsNewTwoToneIcon from '@material-ui/icons/PowerSettingsNewTwoTone'
import MuiAlert from '@material-ui/lab/Alert'
import { uploadAvatarAPI } from 'features/Parkcuc/parkcucSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './style'

const Profile = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const f = useSelector(state => state.parkcuc)
    const [alert, setAlert] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    useEffect(() => {
        if (f.imgUrl) {
            userInfo.avatar = f.imgUrl
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        }
    }, [f.imgUrl])

    const onChangeHandler = async event => {
        const file = event.target.files[0]

        const size = file.size
        if (size > 4 * 1024 * 1024) {
            setAlert(true)
            return
        }

        const formData = new FormData()
        formData.append('file', file, file.name)

        await dispatch(uploadAvatarAPI(formData))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setAlert(false)
    }

    return (
        <>
            {alert &&
                <Snackbar open autoHideDuration={10000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                    <MuiAlert variant="filled" onClose={handleClose} severity="error">
                        Oops! Maximum allowed size for uploaded files (4MB).
                    </MuiAlert>
                </Snackbar>
            }
            {userInfo && <>
            <div className={classes.profile}>
                <label className={classes.label}>
                    <Avatar
                        id="avatar"
                        className={classes.avatar}
                        src={f.imgUrl ? `${process.env.REACT_APP_BASE_URL}/attachment/${f.imgUrl}` : `${process.env.REACT_APP_BASE_URL}/attachment/${userInfo.avatar}`}
                        alt={userInfo.name}/>
                    <input type="file" id="file" name="file" accept="image/*" onChange={e => onChangeHandler(e)} />
                    <AddAPhotoTwoToneIcon className={classes.icon}/>
                </label>
                {f.loadingUploadAvatar &&
                <LinearProgress color="secondary" className={classes.progress} />
                }
            </div>
            <div className={classes.info}>
                <Typography variant="h6">{userInfo.name}</Typography>
                <Typography className={classes.username}>
                    @{!userInfo.username ? "change_your_username" : userInfo.username}
                    <EditTwoToneIcon fontSize="small"/>
                </Typography>
            </div>
            <List subheader={<ListSubheader>Information</ListSubheader>} className={classes.list}>
                <ListItem>
                    <ListItemIcon>
                        <VpnKeyTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Change password" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <PowerSettingsNewTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <ExitToAppTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout all session" />
                </ListItem>
            </List>
            <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.list}>
                <ListItem>
                    <ListItemIcon>
                        <VpnKeyTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Change password" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <PowerSettingsNewTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <ExitToAppTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout all session" />
                </ListItem>
            </List>
            </> }
        </>
    )
}

export default Profile