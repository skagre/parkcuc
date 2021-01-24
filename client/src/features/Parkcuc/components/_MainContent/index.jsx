import React, { useEffect, useState } from 'react'

import ChatHeader from './_ChatHeader'
import ChatContent from './_ChatContent'
import ChatInput from './_ChatInput'
import { useDispatch, useSelector } from 'react-redux'
import { activeConversationID, fetchConversationInfoAPI, fetchMessagesAPI } from 'features/Parkcuc/parkcucSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import Loading from 'components/_Loading'


const MainContent = props => {
    const f = useSelector(state => state.parkcuc)
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    const [conversationInfo, setConversationInfo] = useState(null)
    const [blocker, setBlocker] = useState("")

    useEffect(() => {
        async function fetchMessages() {
            if (f.activeConversationInfo) {
                try {
                    const rs = await dispatch(fetchConversationInfoAPI({ user_id: f.activeConversationInfo._id }))
                    const conversationStatus = unwrapResult(rs)
                    setBlocker(conversationStatus.data.fetchConversationInfo.blocker)

                    const actionResult = await dispatch(fetchMessagesAPI({ user_id: f.activeConversationInfo._id, limit: 1000, offset: 0 }))
                    const fetchStatus = unwrapResult(actionResult)
                    setMessages(fetchStatus.data.fetchMessages.data)
                    setConversationInfo(fetchStatus.data.fetchMessages.conversation)
                    await dispatch(activeConversationID(fetchStatus.data.fetchMessages.conversation._id))
                } catch {
                    console.log("Oops! Failed to fetchMessages.")
                }
            }
        }
        fetchMessages()
    }, [f.activeConversationInfo])

    return (
        <> 
            {f.loadingFetchMessages && <Loading />}
            {f.activeConversationInfo && <>
                <ChatHeader userInfo={f.activeConversationInfo}/>
                <ChatContent avatar={f.activeConversationInfo.avatar} messages={messages} />
                {conversationInfo 
                ?
                <ChatInput conversationInfo={conversationInfo} blocker={blocker}/>
                :
                <ChatInput/>
                }
            </>}
        </>
    )
}

export default MainContent