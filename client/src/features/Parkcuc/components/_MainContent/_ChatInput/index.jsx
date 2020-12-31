import { InputAdornment, Snackbar, TextField } from '@material-ui/core'
import AttachFileTwoToneIcon from '@material-ui/icons/AttachFileTwoTone'
import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone'
import ImageTwoToneIcon from '@material-ui/icons/ImageTwoTone'
import MuiAlert from '@material-ui/lab/Alert'
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react'
import { rerenderAttachments, sendMessageAPI, uploadAttachmentsAPI } from 'features/Parkcuc/parkcucSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './style'
import io from 'socket.io-client'


let socket
socket = io(process.env.REACT_APP_SOCKET_IO)
const ChatInput = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const f = useSelector(state => state.parkcuc)
    const [msg, setMsg] = useState("")
    const [openEmoji, setOpenEmoji] = useState(false)
    const [alert, setAlert] = useState({ open: false, text: ''})

    useEffect(() => {
        async function sendMessage() {
            if (f.attachment) {
                dispatch(sendMessageAPI({ conversation_id: f.activeConversationID, attachment: f.attachment.filename, mimetype_attachment: f.attachment.mimetype}))
            }
        }
        sendMessage()
    }, [f.attachment])

    const onEmojiClick = (event, emojiObject) => {
        setMsg(msg + emojiObject.emoji)
    }

    const sendMessage = async e => {
        if (e.keyCode !== 13 || msg.trim() === "") return

        setOpenEmoji(false)
        setMsg("")
        await dispatch(sendMessageAPI({ conversation_id: f.activeConversationID, body: msg}))
    }

    const onQuickEmojiClick = async emoji => {
        await dispatch(sendMessageAPI({ conversation_id: f.activeConversationID, body: emoji}))
    }

    const onAttachFileClick = () => {
        document.getElementById("attachfile").click()
    }

    const onAttachImageClick = () => {
        document.getElementById("attachimage").click()
    }

    const onChangeHandler = async event => {
        const files = event.target.files
        
        if (files.length > 25) {
            setAlert({ open: true, text: 'Oops! Oops! Maximum allowed files for uploaded (25 files).'})
            return
        } 

        const formData = new FormData()
        formData.append('conversation', f.activeConversationID)
        Array.from(files).forEach(file => {
            const size = file.size
            if (size > 25 * 1024 * 1024) {
                setAlert({ open: true, text: 'Oops! Maximum allowed size for uploaded files (25MB).'})
                return
            }
            formData.append('file', file, file.name)
        })
        
        await dispatch(uploadAttachmentsAPI(formData))
        dispatch(rerenderAttachments(true))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setAlert(false)
    }

    return (
        <>
        {alert.open &&
            <Snackbar open autoHideDuration={10000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <MuiAlert variant="filled" onClose={handleClose} severity="error">
                    {alert.text}
                </MuiAlert>
            </Snackbar>
        }
        {openEmoji &&
        <Picker
            onEmojiClick={onEmojiClick} 
            disableAutoFocus={true} 
            skinTone={SKIN_TONE_NEUTRAL}
            groupNames={{smileys_people:"PEOPLE"}}/>
        }
        <div className={classes.chatInput}>
            <AttachFileTwoToneIcon className={classes.icon} onClick={() => onAttachFileClick()}/>
            <ImageTwoToneIcon className={classes.icon} onClick={() => onAttachImageClick()}/>
            <input 
                type="file" 
                id="attachfile" 
                style={{display: 'none'}}
                multiple
                onChange={e => onChangeHandler(e)}/>
            <input 
                type="file" 
                id="attachimage" 
                style={{display: 'none'}}
                accept="video/*,image/*"
                multiple
                onChange={e => onChangeHandler(e)}/>
            <TextField
                className={classes.input}
                placeholder="Write your message..."
                InputProps={{
                    endAdornment: 
                        <InputAdornment position="end">
                            <EmojiEmotionsTwoToneIcon 
                                className={classes.inputIcon} 
                                onClick={() => setOpenEmoji(!openEmoji)}
                            />
                        </InputAdornment>,
                    disableUnderline: true
                }}
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyUp={e => sendMessage(e)}
            />
            <span className={classes.quickEmoji} onClick={() => onQuickEmojiClick('👍')}>👍</span>
        </div>
        </>
    )
}

export default ChatInput