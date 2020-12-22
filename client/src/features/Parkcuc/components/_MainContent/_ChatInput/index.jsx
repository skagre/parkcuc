import React, { useState } from 'react'

import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone'
import AttachFileTwoToneIcon from '@material-ui/icons/AttachFileTwoTone'
import ChildCareTwoToneIcon from '@material-ui/icons/ChildCareTwoTone'
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone'

import useStyles from './style';
import { TextField, InputAdornment } from '@material-ui/core';


const ChatInput = props => {
    const classes = useStyles()
    const [msg, setMsg] = useState("")
    
    const sendMessage = e => {
        if (e.keyCode !== 13 || msg.trim() === "") return

        console.log(msg)
        setMsg("")
    }

    return (
        <div className={classes.chatInput}>
            <AttachFileTwoToneIcon className={classes.icon} />
            <ChildCareTwoToneIcon className={classes.icon} />
            <TextField
                className={classes.input}
                placeholder="Write your message..."
                InputProps={{
                    endAdornment: <InputAdornment position="end"><EmojiEmotionsTwoToneIcon className={classes.inputIcon} /></InputAdornment>,
                    disableUnderline: true
                }}
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyUp={e => sendMessage(e)}
            />
            <ThumbUpTwoToneIcon className={classes.icon} />
        </div>
    );
}

export default ChatInput