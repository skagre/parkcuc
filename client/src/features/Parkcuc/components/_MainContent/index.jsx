import React, { useEffect, useState } from 'react'

import ChatHeader from './_ChatHeader'
import ChatContent from './_ChatContent'
import ChatInput from './_ChatInput'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessagesAPI } from 'features/Parkcuc/parkcucSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const MainContent = props => {
    const f = useSelector(state => state.parkcuc)
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        async function fetchMessages() {
            if (f.activeConversationInfo) {
                const actionResult = await dispatch(fetchMessagesAPI({ user_id: f.activeConversationInfo._id, limit: 20, offset: 0 }))
                const fetchStatus = unwrapResult(actionResult)
                setMessages(fetchStatus.data.fetchMessages)
            }
        }
        fetchMessages()
    }, [f.activeConversationInfo])
    return (
        <> 
            {f.activeConversationInfo && <>
                <ChatHeader userInfo={f.activeConversationInfo}/>
                <ChatContent avatar={f.activeConversationInfo.avatar} messages={messages}/>
                <ChatInput />
            </>}
        </>
    )
}

export default MainContent