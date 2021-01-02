import {
    Avatar,
    Button, Dialog,
    DialogActions, DialogContent,
    DialogContentText, DialogTitle, GridList,
    GridListTile,
    List,
    ListItem
} from '@material-ui/core'
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'
import PlayCircleOutlineTwoToneIcon from '@material-ui/icons/PlayCircleOutlineTwoTone'
import ReplyTwoToneIcon from '@material-ui/icons/ReplyTwoTone'
import Loading from 'components/_Loading'
import { rerenderAttachments, unsendMessageAPI } from 'features/Parkcuc/parkcucSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import useStyles from './style'


let socket
socket = io(process.env.REACT_APP_SOCKET_IO)
const ChatContent = props => {
    const classes = useStyles()
    const f = useSelector(state => state.parkcuc)
    const [newMsg, setNewMsg] = useState([])

    useEffect(() => {
        if (f.activeConversationID) {
            socket.emit('join', f.activeConversationID)
        }
    }, [process.env.REACT_APP_SOCKET_IO, f.activeConversationID])

    useEffect(() => {
        socket.on('message', params => {
            setNewMsg(newMsg => [...newMsg, <Message key={params.message._id} message={params.message} f={f}/>])
        })
    }, [])

    useEffect(() => {
        if (f.newMessage) {
            socket.emit('sendMessage', { 
                message: f.newMessage.data.sendMessage, 
                conversation: f.activeConversationID,
            })
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
            {props.messages.map((message, i) =>
                <Message key={message._id} message={message} f={f}/> 
            )}
            {f.loadingUploadAttachments && <li className={classes.loading}><Loading /></li>}
            {newMsg}
            {gotoBottom()}
        </ul> 
        }
        </>
    )
}

const Message = props => {
    const classes = useStyles()
    const { message, f } = props
    const dispatch = useDispatch()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [openDialog, setOpenDialog] = useState(false)

    const unsend = async params => {
        await dispatch(unsendMessageAPI({ message_id: params.id, type: params.type }))
        handleCloseDialog()

        params.type === 'onlyme'
        ?
        document.getElementById(params.id).innerHTML = '<li style="background-color:transparent !important;border: 1px solid #c4c4c4 !important;color:#00000080 !important">You unsent a message for you</li>'
        :
        document.getElementById(params.id).innerHTML = '<li style="background-color:transparent !important;border: 1px solid #c4c4c4 !important;color:#00000080 !important">You unsent a message for everyone</li>'
    
        dispatch(rerenderAttachments(true))
    }

    const handleShowDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (
        <>
        <li className={`${classes.msg} ${message.sender === userInfo._id ? classes.msgMine : ''}`} title={new Date(parseInt(message.createdAt)) }>
            <Avatar 
                className={classes.avatar}
                src={ message.sender === userInfo._id 
                    ? `${process.env.REACT_APP_BASE_URL}/attachment/${userInfo.avatar}`
                    : `${process.env.REACT_APP_BASE_URL}/attachment/${f.activeConversationInfo.avatar}`} 
                alt={userInfo.name}/>
            <ul id={message._id} className={`${classes.msgBody} ${message.sender === userInfo._id ? classes.msgBodyMine : ''}`}>
                {message.unsend === 'onlyme' && message.sender === userInfo._id
                    ?
                    <li className={classes.unsend}>{message.sender === userInfo._id ? 'You' : f.activeConversationInfo.name} unsent a message for you</li>
                    : 
                    message.unsend === 'everyone'
                    ?
                    <li className={classes.unsend}>{message.sender === userInfo._id ? 'You' : f.activeConversationInfo.name} unsent a message for everyone</li>
                    :
                <>
                {message.body && <li>{message.body}</li>}
                {message.attachments &&
                    <li className={`${classes.msgHasMedia} ${message.sender === userInfo._id ? classes.msgHasMediaMine : ''}`}>
                        <GridList cellHeight={200} className={classes.gridList} cols={message.attachments.length === 1 ? 1 : message.attachments.length === 2 ? 2 : 3}>
                                {message.attachments.filter(images => images.mimetype.includes('image')).map(image =>
                                    <GridListTile cols={1}>
                                        <img className={classes.image} src={`${process.env.REACT_APP_BASE_URL}/attachment/${image.filename}`} alt={image.filename} />
                                    </GridListTile>
                                )}
                                {message.attachments.filter(videos => videos.mimetype.includes('video')).map(video =>
                                    <GridListTile cols={1}>
                                        <video className={classes.video}>
                                            <source src={`${process.env.REACT_APP_BASE_URL}/attachment/${video.filename}`}/>
                                        </video>
                                        <PlayCircleOutlineTwoToneIcon className={classes.icon} />
                                    </GridListTile>
                                )}
                        </GridList>
                    </li>
                }
                {message.attachments &&
                    message.attachments.filter(files => !files.mimetype.includes('image') && !files.mimetype.includes('video')).map(file =>
                        <li className={`${classes.msgHasDocument} ${message.sender === userInfo._id ? classes.msgHasDocumentMine : ''}`}>
                        <List>
                            <ListItem>
                                <AttachmentTwoToneIcon />
                                <a href={`${process.env.REACT_APP_BASE_URL}/file/${file.filename}`} target="_blank">{file.originalname}</a>
                            </ListItem>
                        </List>
                        </li>
                    )
                }
                <span>
                    <DeleteTwoToneIcon onClick={() => handleShowDialog()}/>
                    <ReplyTwoToneIcon/>
                </span>
                </>
                }
            </ul>
        </li>
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{`Are you sure unsend this message ?`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This action can not be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary" autoFocus>
                    Cancel
                </Button>
                <Button onClick={() => unsend({ id: message._id, type: 'onlyme'})} color="primary">
                    Only me
                </Button>
                <Button onClick={() => unsend({ id: message._id, type: 'everyone'})} color="primary">
                    Everyone
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default ChatContent