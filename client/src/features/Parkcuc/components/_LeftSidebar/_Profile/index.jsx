import {
    Avatar,
    LinearProgress,
    Snackbar, Typography
} from '@material-ui/core'
import AddAPhotoTwoToneIcon from '@material-ui/icons/AddAPhotoTwoTone'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone'
import MuiAlert from '@material-ui/lab/Alert'
import { unwrapResult } from '@reduxjs/toolkit'
import Loading from 'components/_Loading'
import { fetchUserInfoAPI, uploadAvatarAPI } from 'features/Parkcuc/parkcucSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './style'

const Profile = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const f = useSelector(state => state.parkcuc)
    const [userInfo, setUserInfo] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    const [alert, setAlert] = useState(false)
    const [progressUpload, setProgressUpload] = useState(false)
    
    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const actionResult = await dispatch(fetchUserInfoAPI())
                const fetchStatus = unwrapResult(actionResult)
                setUserInfo(fetchStatus.data.fetchUserInfo)
            } catch (err) {
                console.log("Oops! Failed to fetchUserInfo.")
            }
        }
        fetchUserInfo()
    }, [])

    const onChangeHandler = async event => {
        setProgressUpload(true)
        const reader = new FileReader()
        const file = event.target.files[0]

        const size = file.size
        if (size > 4 * 1024 * 1024) {
            setAlert(true)
            setProgressUpload(false)
            return
        }

        const formData = new FormData()
        formData.append('file', file, file.name)

        await dispatch(uploadAvatarAPI(formData))
        reader.readAsDataURL(file)
        reader.addEventListener('load', event => {
            setImgUrl(event.target.result)
        })
        setProgressUpload(false)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setAlert(false)
    }

    return (
        <>
            {f.loading && <Loading />}
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
                        className={classes.avatar}
                        src={imgUrl ? imgUrl : `${process.env.REACT_APP_BASE_URL}/image/${userInfo.avatar}`}
                        alt={userInfo.name}/>
                    <input type="file" id="file" name="file" accept="image/*" onChange={e => onChangeHandler(e)} />
                    <AddAPhotoTwoToneIcon className={classes.icon}/>
                </label>
                <LinearProgress color="secondary" className={classes.progress} style={{display: progressUpload ? 'block': 'none'}}/>
            </div>
            <div className={classes.info}>
                <Typography variant="h6">{userInfo.name}</Typography>
                <Typography className={classes.username}>
                    @{!userInfo.username ? "change_your_username" : userInfo.username}
                    <EditTwoToneIcon fontSize="small"/>
                </Typography>
            </div>
            </> }
        </>
    )
}

export default Profile