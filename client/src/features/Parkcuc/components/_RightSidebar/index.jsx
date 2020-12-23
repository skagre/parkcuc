import React from 'react'

import Header from './_Header'
import Actions from './_Actions'
import Privacy from './_Privacy'
import SharedFiles from './_SharedFiles'
import SharedMedia from './_SharedMedia'

import useStyles from './style'
import { useSelector } from 'react-redux'


const RightSidebar = props => {
    const classes = useStyles()
    //const f = useSelector(state => state.parkcuc)
    return (
        <div className={`${classes.rightSidebar} custom-scroll`}> 
            <Header />
            <Actions />
            <Privacy />
            <SharedFiles />
            <SharedMedia />
        </div>
    )
}

export default RightSidebar