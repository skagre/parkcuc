import { InputAdornment, TextField } from '@material-ui/core'
import AttachFileTwoToneIcon from '@material-ui/icons/AttachFileTwoTone'
import ChildCareTwoToneIcon from '@material-ui/icons/ChildCareTwoTone'
import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone'
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react'
import { sendMessageAPI } from 'features/Parkcuc/parkcucSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './style'


const ChatInput = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const f = useSelector(state => state.parkcuc)
    const [msg, setMsg] = useState("")
    const [openEmoji, setOpenEmoji] = useState(false)

    const onEmojiClick = (event, emojiObject) => {
        setMsg(msg + emojiObject.emoji)
    }
    
    const sendMessage = async e => {
        if (e.keyCode !== 13 || msg.trim() === "") return

        await dispatch(sendMessageAPI({ conversation_id: f.activeConversationID, body: msg}))
        setOpenEmoji(false)
        setMsg("")
    }

    const onQuickEmojiClick = async emoji => {
        await dispatch(sendMessageAPI({ conversation_id: f.activeConversationID, body: emoji}))
    }

    return (
        <>
        {openEmoji &&
        <Picker
            onEmojiClick={onEmojiClick} 
            disableAutoFocus={true} 
            skinTone={SKIN_TONE_NEUTRAL}
            groupNames={{smileys_people:"PEOPLE"}}/>
        }
        <div className={classes.chatInput}>
            <AttachFileTwoToneIcon className={classes.icon} />
            <ChildCareTwoToneIcon className={classes.icon} />
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