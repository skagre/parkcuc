import React from 'react'

import {
    Avatar,
    Typography,
    TextField,
    InputAdornment,
    Chip
} from '@material-ui/core'

import AddAPhotoTwoToneIcon from '@material-ui/icons/AddAPhotoTwoTone'
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone'

import useStyles from './style'


const Profile = props => {
    const classes = useStyles()
    const handleDelete = () => {
        console.info('You clicked the delete icon.')
    }
    return (
        <>
            <div className={classes.profile}>
                <Avatar 
                    className={classes.avatar}
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                    onClick={() => alert("clicked")}
                />
                <AddAPhotoTwoToneIcon className={classes.icon}/>
            </div>
            <div className={classes.info}>
                <Typography>XUÂN BẮC</Typography>
                <Typography>@skagre<EditTwoToneIcon fontSize="small"/></Typography>
                <TextField
                    className={classes.textField}
                    color="secondary"
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><LocalOfferTwoToneIcon color="secondary"/></InputAdornment>,
                    }}
                />
            </div>
        </>
    )
}

export default Profile