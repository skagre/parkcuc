import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { fetchUserInfoAPI, uploadAvatarAPI } from 'features/Parkcuc/parkcucSlice'

import {
    Avatar,
    Typography,
    TextField,
    InputAdornment,
    LinearProgress,
    Snackbar
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import AddAPhotoTwoToneIcon from '@material-ui/icons/AddAPhotoTwoTone'
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone'

import useStyles from './style'
import Loading from 'components/_Loading'


const Profile = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const f = useSelector(state => state.parkcuc)
    const [userInfo, setUserInfo] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    const [alert, setAlert] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    
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
        const reader = new FileReader()
        const file = event.target.files[0]

        const size = file.size
        if (size > 4 * 1024 * 1024) {
            setAlert(true)
            return
        }

        const formData = new FormData()
        formData.append('file', file, file.name)

        console.log(formData)

        const actionResult = await dispatch(uploadAvatarAPI(formData))
        const fetchStatus = unwrapResult(actionResult)
        console.log(fetchStatus)
            
        reader.readAsDataURL(file)
        reader.addEventListener('load', event => {
            setImgUrl(event.target.result)
        })
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
                        src={imgUrl ? imgUrl : userInfo.avatar}
                        alt={userInfo.name}/>
                    <input type="file" id="file" name="file" accept="image/*" onChange={e => onChangeHandler(e)} />
                    <AddAPhotoTwoToneIcon className={classes.icon}/>
                </label>
                <LinearProgress color="secondary" className={classes.progress}/>
            </div>
            <div className={classes.info}>
                <Typography>{userInfo.name}</Typography>
                <Typography>@{!userInfo.username ? "change_your_username" : userInfo.username}<EditTwoToneIcon fontSize="small"/></Typography>
                <TextField
                    className={classes.textField}
                    color="secondary"
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><LocalOfferTwoToneIcon color="secondary"/></InputAdornment>,
                    }}
                />
            </div>
            </> }
        </>
    )
}

export default Profile