import React from 'react'
import PropTypes from 'prop-types'
import { TextField, InputAdornment, Button } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search';

import useStyles from './style'


const TabHeadingSeach = props => {
    const classes = useStyles()
    return (
        <div className={classes.warpSearch}>
            <TextField
                InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    disableUnderline: true
                }}
                fullWidth
                placeholder="Search something..."
            />  
        </div>
    )
}

TabHeadingSeach.propTypes = {
    
}

export default TabHeadingSeach