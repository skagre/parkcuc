import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle, List,
    ListItem,
    ListItemText,
    Typography,
    TextField
} from '@material-ui/core'
import AdjustTwoToneIcon from '@material-ui/icons/AdjustTwoTone'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone'
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone'
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react'
import { changeEmojiAPI, sendMessageAPI } from 'features/Parkcuc/parkcucSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './style'


const Actions = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const f = useSelector(state => state.parkcuc)
    const [expanded, setExpanded] = useState(true)
    const [openEmojiDialog, setOpenEmojiDialog] = useState(false)
    const [openNicknameDialog, setOpenNicknameDialog] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const onEmojiClick = async (event, emojiObject) => {
        await dispatch(changeEmojiAPI({ conversation_id: f.activeConversationID, emoji: emojiObject.emoji }))
        await dispatch(sendMessageAPI({ conversation_id: f.activeConversationID, body: `${userInfo.name} set the emoji to ${emojiObject.emoji}`}))
        setOpenEmojiDialog(false)
    }

    return (
        <>
        <Accordion className={classes.accordion} expanded={expanded}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}  onClick={()=> setExpanded(!expanded)}>
                <Typography className={classes.heading}>MORE ACTIONS</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <List className={classes.list}>
                    <ListItem className={classes.listItem} button>
                        <ListItemText primary="Search in conversation" />
                        <SearchTwoToneIcon className={classes.icon} />
                    </ListItem>
                    <ListItem className={classes.listItem} button>
                        <ListItemText primary="Edit nicknames" onClick={() => setOpenNicknameDialog(true)}/>
                        <EditTwoToneIcon className={classes.icon} />
                    </ListItem>
                    <ListItem className={classes.listItem} button>
                        <ListItemText primary="Change theme" />
                        <AdjustTwoToneIcon className={classes.icon} />
                    </ListItem>
                    <ListItem className={classes.listItem} button onClick={() => setOpenEmojiDialog(true)}>
                        <ListItemText primary="Change emoji" />
                        <ThumbUpTwoToneIcon className={classes.icon} />
                    </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
        <Dialog
            open={openEmojiDialog}
            keepMounted
            onClose={() => setOpenEmojiDialog(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Change emoji"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                <Picker
                    onEmojiClick={onEmojiClick} 
                    disableAutoFocus={true} 
                    skinTone={SKIN_TONE_NEUTRAL}
                    groupNames={{smileys_people:"PEOPLE"}}/>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpenEmojiDialog(false)} color="primary">
                Cancel
            </Button>
            </DialogActions>
        </Dialog>

        <Dialog
            open={openNicknameDialog}
            keepMounted
            onClose={() => setOpenNicknameDialog(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Change nickname"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                <TextField className={classes.inputNickname} value="" />
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpenNicknameDialog(false)} color="secondary">
                Delete nickname
            </Button>
            <Button onClick={() => setOpenNicknameDialog(false)} color="primary">
                Cancel
            </Button>
            <Button onClick={() => setOpenNicknameDialog(false)} color="primary">
                Change
            </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default Actions