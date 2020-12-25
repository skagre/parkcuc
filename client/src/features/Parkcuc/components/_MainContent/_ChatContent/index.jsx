import {
    Avatar,
    GridList,
    List,
    GridListTile,
    ListItem
} from '@material-ui/core'
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useStyles from './style'
import io from 'socket.io-client'

  
let socket
const ChatContent = props => {
    const classes = useStyles()
    const f = useSelector(state => state.parkcuc)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [newMsg, setNewMsg] = useState([])

    useEffect(() => {
        socket = io(process.env.REACT_APP_SOCKET_IO)
        if (f.activeConversationID) {
            socket.emit('join', { userInfo: userInfo, conversation: f.activeConversationID })
        }
    }, [process.env.REACT_APP_SOCKET_IO, f.activeConversationID])

    useEffect(() => {
        socket.on('message', () => {
            console.log("s")
        })
    
    })

    useEffect(() => {
        if (f.newMessage) {
            setNewMsg([...newMsg, <Message message={f.newMessage.data.sendMessage} userInfo={userInfo} f={f}/>])
        }
    }, [f.newMessage])

    useEffect(() => {
        setNewMsg([])
    }, [f.activeConversationID])

    useEffect(() => {
        gotoBottom()
    }, [newMsg])

    const gotoBottom = () => {
        try {
            let element = document.getElementById("chatWrap")
            element.scrollTop = element.scrollHeight - element.clientHeight
        } catch {}
    }
    
    return (
        <>
        {props.messages &&
        <ul className={`${classes.chatWrap} custom-scroll`} id="chatWrap">
            {props.messages.map(message =>
                <Message message={message} userInfo={userInfo} f={f}/>
            )}
            {newMsg}
            {gotoBottom()}
        </ul> 
        }
        </>
    )
}

const Message = props => {
    const classes = useStyles()
    const { message, userInfo, f } = props
    return (
        <li key={message._id} className={`${classes.msg} ${message.sender === userInfo._id ? classes.msgMine : ''}`}>
            <Avatar 
                className={classes.avatar}
                src={ message.sender === userInfo._id 
                    ? `${process.env.REACT_APP_BASE_URL}/image/${userInfo.avatar}`
                    : `${process.env.REACT_APP_BASE_URL}/image/${f.activeConversationInfo.avatar}`} 
                alt={userInfo.name}/>
            <ul className={`${classes.msgBody} ${message.sender === userInfo._id ? classes.msgBodyMine : ''}`}>
                {message.body && <li>{message.body}</li>}
                {message.attachment && 
                    message.mimetype_attachment.includes("image")
                    ?
                    <li className={`${classes.msgHasMedia} ${message.sender === userInfo._id ? classes.msgHasMediaMine : ''}`}>
                        <GridList cellHeight={200} className={classes.gridList} cols={1} >
                            <GridListTile cols={1}>
                                <img src={`${process.env.REACT_APP_BASE_URL}/image/${message.attachment}`} alt="alt" />
                            </GridListTile>
                            {/* <GridListTile cols={1}>
                                <video className={classes.video}>
                                    <source src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4" type="video/mp4" />
                                </video>
                                <PlayCircleOutlineTwoToneIcon className={classes.icon} />
                            </GridListTile> */}
                        </GridList>
                    </li>
                    : 
                    <li className={`${classes.msgHasDocument} ${message.sender === userInfo._id ? classes.msgHasDocumentMine : ''}`}>
                        <List>
                            <ListItem>
                                <AttachmentTwoToneIcon />
                                <a href={`${process.env.REACT_APP_BASE_URL}/file/${message.attachment}`} target="_blank">{message.attachment}</a>
                            </ListItem>
                        </List>
                    </li>
                }
            </ul>
        </li>
    )
}

export default ChatContent