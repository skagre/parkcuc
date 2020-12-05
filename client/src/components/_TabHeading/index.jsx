import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

import useStyles from './style'


const TabHeading = props => {
    const classes = useStyles()
    return (
        <div className={classes.wrapHeading}>
            <Typography className={classes.heading}>
                {props.text}
            </Typography>
            <Typography className={classes.subHeading}>
                {props.subtext}
            </Typography>
        </div>
    )
}

TabHeading.propTypes = {
    text: PropTypes.string.isRequired,
    subtext: PropTypes.string.isRequired
}

export default TabHeading