import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { findFriendAPI } from 'features/Parkcuc/parkcucSlice'

import PropTypes from 'prop-types'
import { TextField, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './style'



const TabHeadingSeach = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [text, setText] = useState("")

    useEffect(() => {
        async function findFriend() {
            await dispatch(findFriendAPI({ search: text, limit: 20, offset: 0 }))
        }
        findFriend()
    }, [text])

    return (
        <div className={classes.warpSearch}>
            <TextField
                InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    disableUnderline: true
                }}
                fullWidth
                placeholder="Search something..."
                onChange={e => setText(e.target.value)}
            />  
        </div>
    )
}

TabHeadingSeach.propTypes = {
    
}

export default TabHeadingSeach