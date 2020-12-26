import React, { useEffect, useState } from 'react'

import ChatHeader from './_ChatHeader'
import ChatContent from './_ChatContent'
import ChatInput from './_ChatInput'
import { useDispatch, useSelector } from 'react-redux'
import { activeConversationID, fetchMessagesAPI } from 'features/Parkcuc/parkcucSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import Loading from 'components/_Loading'
import io from 'socket.io-client'


let socket
socket = io(process.env.REACT_APP_SOCKET_IO)
const MainContent = props => {
    const f = useSelector(state => state.parkcuc)
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        async function fetchMessages() {
            if (f.activeConversationInfo) {
                const actionResult = await dispatch(fetchMessagesAPI({ user_id: f.activeConversationInfo._id, limit: 1000, offset: 0 }))
                const fetchStatus = unwrapResult(actionResult)
                setMessages(fetchStatus.data.fetchMessages.data)
                await dispatch(activeConversationID(fetchStatus.data.fetchMessages.conversation))
            }
        }
        fetchMessages()
    }, [f.activeConversationInfo])

    useEffect(() => {
        if (f.activeConversationID) {
            socket.emit('join', f.activeConversationID)
        }
    }, [process.env.REACT_APP_SOCKET_IO, f.activeConversationID])

    useEffect(() => {
        socket.on('message', message => {
            console.log(message)
        })
    }, [])

    return (
        <> 
            {f.loadingFetchMessages && <Loading />}
            {f.activeConversationInfo && <>
                <ChatHeader userInfo={f.activeConversationInfo}/>
                <ChatContent avatar={f.activeConversationInfo.avatar} messages={messages}/>
                <ChatInput />
            </>}
        </>
    )
}

export default MainContent