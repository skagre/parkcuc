import Loading from 'components/_Loading'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './style'
import Actions from './_Actions'
import Header from './_Header'
import Privacy from './_Privacy'
import SharedFiles from './_SharedFiles'
import SharedMedia from './_SharedMedia'


const RightSidebar = props => {
    const classes = useStyles()
    const f = useSelector(state => state.parkcuc)

    return (
        <>
        {f.loadingFetchAttachments && <Loading />}
        {f.activeConversationInfo &&  
            <div className={`${classes.rightSidebar} custom-scroll`}> 
                <Header ConversationInfo={f.activeConversationInfo}/>
                <Actions />
                <Privacy />
                <SharedFiles />
                <SharedMedia /> 
            </div>
        }
        </>
    )
}

export default RightSidebar